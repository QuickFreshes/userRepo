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
      <View
        style={{
          margin: 3,
        }}
      >
        <Image
          style={{
            width: "100%",
            aspectRatio: 6 / 4,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          source={{ uri: shops.image }}
        />
        <View
          style={{
            padding: 10,
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>
              {shops.name}
            </Text>
            <Text style={{ fontSize: 15, color: "gray", marginVertical: 7 }}>
              {shops.location}
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            right: 10,
            top: 20,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 50,
            flexDirection: "row",
          }}
        >
          <AntDesign name="hearto" size={24} color="black" />
        </View>
      </View>
    </Pressable>
  );
};

export default SearchStores;

const styles = StyleSheet.create({});
