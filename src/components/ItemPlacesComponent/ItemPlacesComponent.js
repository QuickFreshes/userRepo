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
    <View style={styles.card}>
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
            <View style={styles.ItemPlaces}>
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
  ItemPlaces: {
    margin: 4,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  textDesign1: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
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
    // -------------------------
    backgroundColor: "white",
    // borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    margin: 6,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  card: {
    // backgroundColor: "#FF7C7C",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    margin: 6,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 20,
  },
});
