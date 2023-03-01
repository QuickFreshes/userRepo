import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const BackButton = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.goBack();
  };
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "black",
        width: 40,
        height: 40,
        marginLeft: 5,
        marginTop: 5,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name="chevron-back" size={24} color="white" />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
