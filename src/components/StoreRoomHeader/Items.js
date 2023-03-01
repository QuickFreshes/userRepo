import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Items = ({ Item }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("ItemDetails", { id: Item.id })}
    >
      <View>
        <Text style={styles.name}>{Item.name}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {Item.description}
        </Text>
        <Text style={styles.price}>₹ {Item.price}</Text>
      </View>
      {Item.image && (
        <Image style={styles.image} source={{ uri: Item.image }} />
      )}
    </Pressable>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderColor: "lightgrey",
    borderWidth: 1.5,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: 0.5,
  },
  description: {
    color: "gray",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,
    top: 5,
    left: 10,
  },
});
