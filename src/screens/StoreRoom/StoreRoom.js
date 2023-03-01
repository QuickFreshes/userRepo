import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Pressable,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Items from "../../components/StoreRoomHeader/Items";
import StoreRoomHeader from "../../components/StoreRoomHeader/StoreRoomHeader";
import { Shop } from "../../models";
import { Product } from "../../models";
import { DataStore } from "aws-amplify";
import { useBasketContext } from "../../contexts/BasketContext";
import ListFooterComponent from "../../components/ListFooterComponent/ListFooterComponent";

const StoreRoom = () => {
  const navigation = useNavigation();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const route = useRoute();
  const id = route.params?.id;
  const distance = route.params?.distance;
  // console.log("Distance:", distance);
  const { setBasketShop, basket, basketProducts } = useBasketContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setBasketShop(null);
    DataStore.query(Shop, id).then(setShop);
    DataStore.query(Product, (p) => p.shopID.eq(id)).then(setProducts);
  }, [id]);

  useEffect(() => {
    setBasketShop(shop);
  }, [shop]);

  // Update the products state when an item is removed from the basket
  useEffect(() => {
    const updatedProducts = [...products];
    basketProducts.forEach((basketProduct) => {
      const index = updatedProducts.findIndex(
        (product) => product.id === basketProduct.productID
      );
      if (index !== -1) {
        updatedProducts[index].quantity -= basketProduct.quantity;
      }
    });
    setProducts(updatedProducts);
  }, [basketProducts]);

  if (!shop) {
    return (
      <ActivityIndicator
        color="black"
        size="large"
        style={styles.activityIndicator}
      />
    );
  }
  // console.log(distance);
  return (
    <>
      <View style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
        <SafeAreaView>
          <FlatList
            ListHeaderComponent={() => <StoreRoomHeader shop={shop} />}
            ListFooterComponent={() => <ListFooterComponent />}
            data={products}
            renderItem={({ item }) => <Items Item={item} />}
            keyExtractor={(item) => item.name}
          />
          <View style={styles.buttonContainer}>
            {basket && (
              <Pressable
                onPress={() =>
                  navigation.navigate("Basket", {
                    // id: shop.id,
                    distance: distance,
                  })
                }
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  Open basket ({basketProducts?.length})
                </Text>
              </Pressable>
            )}
          </View>
        </SafeAreaView>
      </View>
      {/* <ViewCart shopName={route.params.name} /> */}
      {/* <ViewCart shopName={shop.name} /> */}
    </>
  );
};

export default StoreRoom;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF3CF",
    height: 80,
  },
  button: {
    backgroundColor: "#FFD700",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginTop: "auto",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
  },
  buttonContainer: {
    position: "absolute",
    top: 640,
    left: 0,
    right: 0,
    margin: 10,
    backgroundColor: "#FCF3CF",
  },
});
