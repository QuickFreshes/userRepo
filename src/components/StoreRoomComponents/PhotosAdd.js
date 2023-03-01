import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PhotosAdd = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        width: 90,
        padding: 7,
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 7,
        borderTopLeftRadius: 7,
      }}
    >
      <Text style={{ color: "#FFD700" }}>30+ </Text>
      <Text style={{ color: "#FFD700", fontWeight: "bold" }}>PHOTOS</Text>
    </View>
  );
};

export default PhotosAdd;

const styles = StyleSheet.create({});
