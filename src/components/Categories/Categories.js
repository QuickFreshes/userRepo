import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const Categories = ({ shops }) => {
  // console.log(shops);
  const items = [
    {
      id: "1",
      name: "fastest delivery",
    },
    {
      id: "2",
      name: "rating 4.0+",
    },
    {
      id: "3",
      name: "offers",
    },
    {
      id: "4",
      name: "products",
    },
    {
      id: "5",
      name: "MAX Safety",
    },
    {
      id: "6",
      name: "Pro",
    },
  ];
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={items}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("FilterScreen", {
                shops: shops,
                name: item.name,
              })
            }
            style={{
              backgroundColor: "black",
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              padding: 5,
              borderRadius: 7,
            }}
          >
            <Text style={{ color: "#FFD700", fontWeight: "500" }}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
