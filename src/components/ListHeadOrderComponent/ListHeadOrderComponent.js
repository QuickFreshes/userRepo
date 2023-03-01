import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ListHeadOrderComponent = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          padding: 12,
          backgroundColor: "#FFD700",
        }}
      >
        Your Orders
      </Text>
      <View
        style={{
          borderColor: "#82e0aa",
          height: 1,
          borderWidth: 2,
        }}
      />
    </View>
  );
};

export default ListHeadOrderComponent;

const styles = StyleSheet.create({});
