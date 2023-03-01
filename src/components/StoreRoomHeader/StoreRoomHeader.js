import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import BackButton from "../../components/BackButton/BackButton";
import CameraSaveShare from "../StoreRoomComponents/CameraSaveShare";
import PhotosAdd from "../StoreRoomComponents/PhotosAdd";
import ModeDelTimeOffers from "../StoreRoomComponents/ModeDelTimeOffers";
import AdditionalDistanceFee from "../StoreRoomComponents/AdditionalDistanceFee";
const StoreRoomHeader = ({ shop }) => {
  return (
    <View style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: 10,
        }}
      >
        <BackButton />
        <CameraSaveShare />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* StoreRoomHeader Starts */}
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", width: 260 }}>
            {/* {route.params.name} */}
            {shop.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "gray",
              fontWeight: "500",
              width: 260,
              marginVertical: 5,
            }}
          >
            {/* {route.params.ShopType} */}
            {shop.ShopType}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#6082B6",
              fontWeight: "500",
              width: 260,
            }}
          >
            {/* {route.params.smalladdress} */}
            {shop.small_address}
          </Text>
        </View>
        {/* StoreRoomHeader Ends */}
        <View>
          {/* Rating Section Starts */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "black",
              width: 90,
              padding: 7,
              alignItems: "center",
              justifyContent: "center",
              borderBottomLeftRadius: 7,
              borderTopLeftRadius: 7,
              marginVertical: 10,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#FFD700",
                marginRight: 5,
              }}
            >
              {/* {route.params.rating} */}
              {shop.rating.toFixed(1)}
            </Text>
            <AntDesign name="star" size={22} color="#FFD700" />
          </View>
          {/* Rating Section Ends */}
          <PhotosAdd />
        </View>
      </View>
      <ModeDelTimeOffers />
      <AdditionalDistanceFee />
    </View>
  );
};

export default StoreRoomHeader;

const styles = StyleSheet.create({});
