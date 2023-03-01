import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Stores from "../../components/Stores/Stores";
import BackButton from "../../components/BackButton/BackButton";
import { Entypo } from "@expo/vector-icons";

const FilterScreen = () => {
  const route = useRoute();
  const filterShop = route.params?.filterShop;
  const name = route.params?.name;
  const [filteredShops, setFilteredShops] = useState([]);

  // useEffect(() => {
  //   let shops = filterShop;
  //   if (name === "rating 4.0+") {
  //     shops = shops.filter((item) => item.shop.rating >= 4);
  //   }
  //   setFilteredShops(shops);
  // }, [filterShop, name]);
  useEffect(() => {
    let shops = filterShop;
    if (name === "rating 4.0+") {
      shops = shops.filter((item) => item.shop.rating >= 4);
    } else if (name === "fastest delivery") {
      shops = shops.filter((item) => item.distance < 3);
    } else if (name === "offers") {
      shops = shops.filter((item) => item.shop.minDeliveryTime <= 1);
    } else if (name === "MAX Safety") {
      shops = shops.filter((item) => item.shop.maxDeliveryTime <= 1);
    } else if (name === "Pro") {
      shops = shops.filter((item) => item.shop.deliveryFee <= 1);
    }
    setFilteredShops(shops);
  }, [filterShop, name]);

  console.log(filteredShops);

  return (
    <View style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#FFD700",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BackButton />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            marginRight: 30,
            backgroundColor: "#000000",
            borderRadius: 20,
            color: "#82e0aa",
            padding: 10,
          }}
        >
          {name}
        </Text>
      </View>
      <ScrollView style={{ margin: 10 }}>
        {/* {filteredShops.map((item, index) => (
          <Stores shop={item.shop} distance={item.distance} key={index} />
        ))} */}
        {filteredShops.length > 0 ? (
          filteredShops.map((item, index) => (
            <Stores shop={item.shop} distance={item.distance} key={index} />
          ))
        ) : (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Entypo name="emoji-sad" size={80} color="black" />
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              Sorry!!! no shops found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({});
