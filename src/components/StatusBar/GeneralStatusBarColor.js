import React from "react";
import { View, StatusBar } from "react-native";

const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
  <View>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default GeneralStatusBarColor;
