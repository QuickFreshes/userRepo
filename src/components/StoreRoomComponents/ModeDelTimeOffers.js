import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";

const ModeDelTimeOffers = () => {
  return (
    <View
      style={{
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 5,
          padding: 5,
        }}
      >
        <FontAwesome5 name="motorcycle" size={24} color="black" />
        <View style={{ marginLeft: 8 }}>
          <Text>Mode</Text>
          <Text>Delivery</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 5,
          padding: 5,
        }}
      >
        <Entypo name="back-in-time" size={24} color="black" />
        <View style={{ marginLeft: 8 }}>
          <Text>Time</Text>
          <Text>30min</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 5,
          padding: 5,
        }}
      >
        <MaterialCommunityIcons
          name="brightness-percent"
          size={24}
          color="black"
        />
        <View style={{ marginLeft: 8 }}>
          <Text>OFFERS</Text>
          <Text>View all</Text>
        </View>
      </View>
    </View>
  );
};

export default ModeDelTimeOffers;

const styles = StyleSheet.create({});
