import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import OtherPlaces from "../../../assets/data/OtherPlaces/OtherPlaces";

const ItemPlacesComponent = () => {
  const navigation = useNavigation();
  // const onPress = () => {
  //   navigation.navigate("OtherPlaces", { name: item.name });
  // };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Buy from other cities
      </Text>

      <FlatList
        data={OtherPlaces}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("OtherPlaces", {
                name: item.name,
                lat: item.lat,
                lng: item.lng,
              })
            }
          >
            <View style={{ margin: 4, alignItems: "center" }}>
              <Image style={styles.MiddleImage} source={{ uri: item.image }} />
              <Text style={styles.textDesign1}>{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default ItemPlacesComponent;

const styles = StyleSheet.create({
  textDesign1: {
    fontSize: 15,
    fontWeight: "600",
    color: "gray",
    margin: 10,
    textAlign: "center",
  },
  textDesign: {
    fontSize: 19,
    fontWeight: "bold",
  },
  MiddleImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
