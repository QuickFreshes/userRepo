import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderImages from "../HeaderImages/HeaderImages";
import ItemPlacesComponent from "../ItemPlacesComponent/ItemPlacesComponent";
const ListHeaderComponent = () => {
  return (
    <View>
      <HeaderImages />
      <ItemPlacesComponent />
    </View>
  );
};

export default ListHeaderComponent;

const styles = StyleSheet.create({});
