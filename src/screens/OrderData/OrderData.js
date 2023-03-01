import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useBasketContext } from "../../contexts/BasketContext";
import { useOrderContext } from "../../contexts/OrderContext";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
const OrderData = () => {
  const { shop, basketProducts, totalPrice } = useBasketContext();
  const { orders } = useOrderContext();
  const [tip, setTip] = useState(0);
  //   console.log(orders);
  return (
    // <View style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
    //   <Text>OrderData</Text>
    //   <Text>{shop?.name}</Text>
    //   <Text style={{ color: "#FFD700" }}>
    //     {new Date(orders?.createdAt).toLocaleDateString()} • {orders?.status}
    //   </Text>
    // </View>
    <ScrollView style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
      <SafeAreaView style={{ marginBottom: 110 }}>
        <View
          style={{
            backgroundColor: "black",
            padding: 10,
            margin: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#FFD700" }}>
            {shop?.name} has accepted your order.
          </Text>
        </View>
        <View
          style={{
            borderColor: "#82e0aa",
            height: 1,
            borderWidth: 2,
          }}
        />

        <View
          style={{
            backgroundColor: "black",
            padding: 5,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20,
            width: 200,
            borderRadius: 7,
          }}
        >
          <Entypo name="back-in-time" size={24} color="#FFD700" />
          <Text style={{ color: "#FFD700", paddingLeft: 7, fontWeight: "500" }}>
            Delivery in 30 minutes
          </Text>
        </View>
        <Text style={{ textAlign: "center", fontSize: 22, marginTop: 10 }}>
          Your order will be packed and delivered soon
        </Text>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Image
            style={{
              width: 250,
              height: 250,
              marginVertical: 0,
            }}
            source={{
              uri: "https://quickfreshesawsbucket.s3.ap-south-1.amazonaws.com/FinalDelivery.png",
            }}
          />
        </View>
        <View
          style={{
            borderColor: "#82e0aa",
            height: 1,
            borderWidth: 2,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            backgroundColor: "black",
            margin: 15,
            borderRadius: 7,
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name="bike-fast" size={30} color="#FFD700" />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#FFD700" }}
            >
              4 valets near the shop.
            </Text>
            <Text style={{ fontSize: 18, color: "#FFD700" }}>
              Anyone will pickup the order
            </Text>
          </View>
        </View>
        <View
          style={{
            borderColor: "#82e0aa",
            height: 1,
            borderWidth: 2,
          }}
        />

        <View style={{ padding: 20, flexDirection: "row", marginBottom: 80 }}>
          <FontAwesome5 name="hand-holding-heart" size={28} color="black" />
          <View style={{ marginLeft: 10 }}>
            <View>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                  paddingHorizontal: 2,
                  color: "FFD700",
                }}
              >
                Tip your Delivery Person
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#696969",
                  marginRight: 10,
                  paddingHorizontal: 2,
                }}
              >
                Thank your delivery partner for helping you stay safe
                indoors.Support them through these tough times with a tip
              </Text>
            </View>
            <Pressable
              style={{
                paddingTop: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                // marginRight: 90,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setTip(30)}
                style={{
                  backgroundColor: "#F5F5F5",
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                  borderRadius: 7,
                }}
              >
                <Text
                  style={{ padding: 10, color: "#002D62", fontWeight: "bold" }}
                >
                  ₹30
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setTip(50)}
                style={{
                  alignItems: "center",
                  backgroundColor: "#F5F5F5",
                  marginHorizontal: 10,
                  borderRadius: 7,
                  // paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{ padding: 4, color: "#002D62", fontWeight: "bold" }}
                >
                  ₹50
                </Text>
                <Text
                  style={{
                    backgroundColor: "orange",
                    paddingHorizontal: 10,
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Most Tipped
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setTip(70)}
                style={{
                  backgroundColor: "#F5F5F5",
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                  borderRadius: 7,
                }}
              >
                <Text
                  style={{ padding: 10, color: "#002D62", fontWeight: "bold" }}
                >
                  ₹70
                </Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </View>
        {tip ? (
          <View>
            <Text
              style={{
                color: "#034694",
                padding: 10,
                marginTop: -70,
                fontSize: 16,
                width: 350,
                fontWeight: "600",
                fontFamily: "sans-serif-medium",
              }}
            >
              please pay {"₹"}
              {tip} to your delivery agent at the time of delivery
            </Text>
            <TouchableOpacity
              onPress={() => setTip(0)}
              activeOpacity={0.7}
              style={{
                padding: 10,
                marginLeft: 10,
                marginRight: 10,
                position: "absolute",
                top: 40,
                marginTop: -60,
                // paddingBottom: 40,
                marginBottom: 100,
              }}
            >
              <Text style={{ color: "red", fontSize: 14, fontWeight: "700" }}>
                (Cancel)
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};

export default OrderData;

const styles = StyleSheet.create({});
