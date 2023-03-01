import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DEFAULT_IMAGE = "https://i.postimg.cc/wvs56TwP/1-1.png";
const DEFAULT_IMAGE_TWO = "https://i.postimg.cc/wvs56TwP/1-1.png";
const StoresTextSearch = ({ shop }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("StoreRoom", { id: shop.id });
  };
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
      }}
    >
      <View>
        <Entypo name="back-in-time" size={24} color="black" />
      </View>
      <View>
        <Text style={{ fontWeight: "600", width: 150 }}>{shop.name}</Text>
      </View>
      <View>
        <Image
          style={{
            width: 100,
            height: 40,
            borderRadius: 7,
          }}
          // source={{ uri: shop.featured_image }}
          source={{
            uri: shop.image.startsWith(" ")
              ? DEFAULT_IMAGE
              : shop.image.startsWith("http")
              ? shop.image
              : DEFAULT_IMAGE_TWO,
          }}
        />
      </View>
      <View>
        <Feather name="arrow-up-left" size={24} color="black" />
      </View>
    </Pressable>
  );
};

export default StoresTextSearch;

const styles = StyleSheet.create({});
