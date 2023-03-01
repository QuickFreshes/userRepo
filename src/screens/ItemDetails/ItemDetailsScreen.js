import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Product } from "../../models/index";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useBasketContext } from "../../contexts/BasketContext";
const ItemDetailsScreen = () => {
  const [Item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loadingTime, setLoadingTime] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const { addProductToBasket } = useBasketContext();

  useEffect(() => {
    if (id) {
      DataStore.query(Product, id).then(setItem);
    }
  }, [id]);

  const onAddToBasket = async () => {
    await addProductToBasket(Item, quantity);
    navigation.goBack();
  };

  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  const getTotal = () => {
    return Item.price * quantity.toFixed(0);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTime(loadingTime + 1000);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [loadingTime]);

  if (!Item) {
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
        {/* <Text style={styles.indicatorText}>Loading Items...</Text> */}
        <Text style={styles.indicatorText}>
          {loadingTime > 60000 ? "Sorry, no items found" : "Loading Items..."}
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.page}>
      <Text style={styles.name}>{Item.name}</Text>
      <Text style={styles.description}>{Item.description}</Text>
      <View style={styles.separator} />

      <View style={styles.row}>
        <AntDesign
          name="minuscircleo"
          size={60}
          color={"black"}
          onPress={onMinus}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <AntDesign
          name="pluscircleo"
          size={60}
          color={"black"}
          onPress={onPlus}
        />
      </View>
      <Pressable style={styles.button} onPress={onAddToBasket}>
        <Text style={styles.buttonText}>
          Add {quantity} to basket &#8226; (₹ {getTotal()})
        </Text>
      </Pressable>
    </View>
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FCF3CF",
    flex: 1,
    paddingVertical: 10,
    padding: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
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
  },
  quantity: {
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#FFD700",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginTop: "auto",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
  },
  indicatorText: {
    color: "#FFFFFF",
  },
});
