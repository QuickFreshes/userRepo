import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";

const AdditionalDistanceFee = () => {
  return (
    <View
      style={{
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#C8C8C8",
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Fontisto
        name="motorcycle"
        size={24}
        color="black"
        style={{ marginRight: 10 }}
      />
      <Text style={{ fontWeight: "500", fontSize: 17 }}>
        ₹30 additional distance fee
      </Text>
    </View>
  );
};

export default AdditionalDistanceFee;

const styles = StyleSheet.create({});
