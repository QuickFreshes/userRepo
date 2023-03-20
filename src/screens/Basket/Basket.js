import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import BasketProductComponent from "../../components/BasketProduct/BasketProductComponent";
import { useBasketContext } from "../../contexts/BasketContext";
import { useOrderContext } from "../../contexts/OrderContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import { DataStore } from "aws-amplify";
import { Shop, BasketProduct } from "../../models";
// import MsUpiPayment from "@meerasolution/react-native-ms-upi-payment";
const Basket = () => {
  const [sound, setSound] = useState();
  const { shop, basketProducts, totalPrice } = useBasketContext();
  const [basketState, setBasketState] = useState({
    basketProducts: [],
    totalPrice: 0,
  });
  const [loadingTime, setLoadingTime] = useState(0);
  const { createOrder } = useOrderContext();
  const navigation = useNavigation();

  async function playSound() {
    console.log("Lodaing Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/QuickFreshes.mp3")
    );
    setSound(sound);
    console.log("Playing sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const transactionId = "1";
  const message = `QF Buy`;
  const payTo = "akaashvakharia@oksbi";
  const payName = "Akaash";
  // const currency = "INR";
  const amount = (40 + 0.95).toFixed(2);

  const upiURl = `upi://pay?pa=${payTo}&pn=${payName}&tr=${transactionId}&tn=${message}&am=${amount}&cu=INR`;

  const payMoney = () => {
    Linking.canOpenURL(upiURl)
      .then((supported) => {
        if (!supported) {
          // console.error("Error opening UPI URL: UPI not supported");
          Alert.alert(
            "Error",
            "No UPI app is installed on the device,try to use G-Pay or Paytm"
          );
        } else {
          Linking.openURL(upiURl)
            .then(() => {
              if (Platform.OS === "ios") {
                Linking.addEventListener("url", handlePaymentResponse);
              }
            })
            .catch((err) => {
              console.error("Error opening UPI URL:", err);
              Alert.alert(
                "Error",
                "Could not open UPI app. Please try again later."
              );
            });
        }
      })

      .catch((err) => {
        console.error("Error checking UPI support:", err);
        Alert.alert(
          "Error",
          "Could not check UPI support. Please try again later."
        );
      });
  };

  const handlePaymentResponse = (event) => {
    // Remove the listener to avoid memory leaks
    Linking.removeEventListener("url", handlePaymentResponse);

    const { url } = event;

    if (Platform.OS === "android" || url.startsWith("upi")) {
      // Parse the query params from the URL
      const queryParams = qs.parse(url.split("?")[1]);

      if (queryParams.status === "success") {
        onCreateOrder();
      } else {
        Alert.alert(
          "Payment Failed",
          "The UPI payment was not successful. Please try again later."
        );
      }
    } else if (Platform.OS === "ios") {
      const path = url.split("://")[1];
      const queryParams = qs.parse(path);

      if (queryParams.status === "success") {
        onCreateOrder();
      } else {
        Alert.alert(
          "Payment Failed",
          "The UPI payment was not successful. Please try again later."
        );
      }
    }
  };

  const onCreateOrder = async () => {
    await createOrder();
    navigation.navigate("OrderData");
    setTimeout(() => {
      playSound();
    }, 1000);
  };
  const route = useRoute();
  const distance = route.params?.distance;

  // console.log(basketProducts);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTime(loadingTime + 1000);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [loadingTime]);

  useEffect(() => {
    setBasketState({ basketProducts, totalPrice });
  }, [basketProducts, totalPrice]);

  if (!shop && !basketProducts && !totalPrice) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
        }}
      >
        <ActivityIndicator size={60} color="#FFD700" />

        <Text style={styles.indicatorText}>
          {loadingTime > 30000
            ? "Go back and come back again to this Shop"
            : "Loading Items..."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View>
        <Text style={styles.BasketTitle}>Basket</Text>
        <Text style={styles.shopTitle}>{shop?.name}</Text>
        <Text style={{ color: "grey", fontWeight: "600" }}>
          {shop?.ShopType}
        </Text>

        <Text style={{ color: "grey", fontWeight: "bold" }}>Your items</Text>
      </View>
      <View style={styles.separator} />
      {/* basket items starts */}

      <FlatList
        data={basketState.basketProducts}
        // data={basketProducts}
        renderItem={({ item, index }) => (
          <BasketProductComponent basketproduct={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
      />
      {/* basket item ends */}
      <View style={styles.separator} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text style={{ color: "grey", fontWeight: "bold" }}>Delivery Fee:</Text>
        <Text style={{ color: "grey", fontWeight: "bold" }}>
          {distance <= 5
            ? "Delivery Fee: ₹50"
            : distance > 5 && distance < 9
            ? "Delivery Fee: ₹100"
            : "Delivery Fee: N/A"}
        </Text>
      </View>
      <Pressable onPress={payMoney} style={styles.button}>
        <Text style={styles.buttonText}>
          Purchase &#8226; ₹{totalPrice?.toFixed(0)}
        </Text>
      </Pressable>
    </View>
  );
};

export default Basket;

const styles = StyleSheet.create({
  productsContainer: {
    flexDirection: "row",
    borderColor: "lightgrey",
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  page: {
    backgroundColor: "#FCF3CF",
    flex: 1,
    paddingVertical: 10,
    padding: 10,
  },
  BasketTitle: {
    fontSize: 30,
    fontWeight: "600",
    color: "#FFD700",
  },
  shopTitle: {
    fontSize: 30,
    fontWeight: "600",
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    width: 200,
  },
  description: {
    color: "#696969",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    bottom: 25,
    right: 25,
  },
  quantity: {
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#FFD700",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginTop: "auto",
    // marginBottom: 80,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
  },
  indicatorText: {
    color: "#FFFFFF",
  },
});
