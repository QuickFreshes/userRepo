import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ListFooterComponent = () => {
  const imageUrl =
    "https://quickfreshesawsbucket.s3.ap-south-1.amazonaws.com/FooterBigImg.png";
  return (
    <View>
      <Image
        style={{
          width: 150,
          height: 120,
          left: 20,
          marginTop: 50,
          marginBottom: 370,
          borderRadius: 20,
        }}
        source={{ uri: imageUrl }}
      />
    </View>
  );
};

export default ListFooterComponent;

const styles = StyleSheet.create({});
