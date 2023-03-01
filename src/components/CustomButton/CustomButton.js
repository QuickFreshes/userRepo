import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#FFD700",
    width: "100%",
    padding: 15,
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
  },
  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },
  container_TERTIARY: {},
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  text_TERTIARY: {
    color: "white",
  },
  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
  },
  text_SECONDARY: {
    color: "#3B71F3",
  },
});
