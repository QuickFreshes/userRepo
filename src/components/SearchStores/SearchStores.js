import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchStores = (props) => {
  const shops = props.shop;
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate("SearchScreenStoreRoom", {
          id: shops.id,
        })
      }
    >
      <View style={styles.cardContent}>
        <Image style={styles.cardImage} source={{ uri: shops.image }} />
        <View style={styles.cardText}>
          <View>
            <Text style={styles.cardTitle}>{shops.name}</Text>
            <Text style={styles.cardSubtitle}>{shops.location}</Text>
          </View>
        </View>
        <View style={styles.cardIcon}>
          <AntDesign name="hearto" size={24} color="black" />
        </View>
      </View>
    </Pressable>
  );
};

export default SearchStores;

const styles = StyleSheet.create({
  card: {
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
  },
  cardContent: {
    // flexDirection: "row",
    // alignItems: "center",
    margin: 5,
  },
  cardImage: {
    width: "100%",
    aspectRatio: 7 / 6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardText: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  cardIcon: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    padding: 8,
  },
});
