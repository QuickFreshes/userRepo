import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DEFAULT_IMAGE = "https://i.postimg.cc/wvs56TwP/1-1.png";
const DEFAULT_IMAGE_TWO = "https://i.postimg.cc/wvs56TwP/1-1.png";

const Stores = ({ shop, distance }) => {
  const navigation = useNavigation();
  // console.log("Distance:", distance);
  const onPress = () => {
    navigation.navigate("StoreRoom", { id: shop.id, distance: distance });
  };
  return (
    <Pressable onPress={onPress} style={styles.mainCard}>
      <View style={{ margin: 3 }}>
        <Image
          style={{
            width: "100%",
            aspectRatio: 6 / 4,
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
          }}
          // source={{ uri: shop.featured_image }}
          source={{
            uri: shop.image.startsWith(" ")
              ? DEFAULT_IMAGE
              : shop.image.startsWith("http")
              ? shop.image
              : DEFAULT_IMAGE_TWO,
          }}
        />
        <View
          style={{
            padding: 10,
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", width: 230 }}>
              {shop?.name}
            </Text>
            <Text style={{ fontSize: 15, color: "gray", marginVertical: 7 }}>
              {/* {shop.cuisines} */}
              {shop?.ShopType}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "black",
              padding: 7,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "#82e0aa",
                paddingRight: -20,
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {/* {shop.aggregate_rating} */}
              {shop?.rating?.toFixed(1)}
            </Text>
            <AntDesign name="star" size={20} color="#82e0aa" />
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            right: 0,
            top: 20,
            backgroundColor: "black",
            padding: 4,
            borderBottomLeftRadius: 7,
            borderTopLeftRadius: 7,
            flexDirection: "row",
          }}
        >
          <Entypo name="back-in-time" size={24} color="#FFD700" />
          <Text style={{ color: "#FFD700", fontWeight: "bold", marginLeft: 5 }}>
            {/* {shop.time} */}
            {shop?.maxDeliveryTime} min
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 160,
            backgroundColor: "black",
            padding: 4,
            alignItems: "center",
            borderBottomRightRadius: 7,
            borderTopRightRadius: 7,
            justifyContent: "center",
          }}
        >
          {/* <Text style={{ color: "white", fontWeight: "bold", marginLeft: 5 }}>
            Delivery Fee₹{distance.toFixed(2)}
          </Text> */}
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              marginLeft: 5,
              height: 30,
            }}
          >
            Delivery Fee ₹
            {distance ? (
              distance <= 3 ? (
                30
              ) : distance <= 4 ? (
                <Text style={{ color: "#FFD700", fontWeight: "bold" }}>
                  Upto ₹40
                </Text>
              ) : distance <= 5 ? (
                50
              ) : distance <= 9 ? (
                100
              ) : (
                "N/A"
              )
            ) : (
              "N/A"
            )}
          </Text>

          {/* <Text style={{ color: "#FFD700", fontWeight: "bold" }}>Upto ₹40</Text> */}
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
          }}
        >
          <Text style={{ borderColor: "#D3D3D3", borderWidth: 1, height: 1 }} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign
                  style={{}}
                  name="doubleright"
                  size={21}
                  color="#82e0aa"
                />
              </View>
              <Text style={{ marginLeft: 5, fontWeight: "bold" }}>
                {shop?.no_of_Delivery} + orders
              </Text>
            </View>
            <View
              style={{
                marginLeft: 15,
                backgroundColor: "black",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "#82e0aa" }}
              >
                MAX SAFETY
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "#82e0aa" }}
              >
                DELIVERY
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Stores;

const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: "#FFFCE2",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    margin: 6,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
});
