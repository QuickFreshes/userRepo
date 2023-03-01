import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const CameraSaveShare = () => {
  return (
    <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="md-camera-outline" size={28} color="black" />
      <Feather
        style={{ marginHorizontal: 15 }}
        name="bookmark"
        size={24}
        color="black"
      />
      <MaterialCommunityIcons name="share-outline" size={24} color="black" />
    </Pressable>
  );
};

export default CameraSaveShare;

const styles = StyleSheet.create({});
