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

  useEffect(() => {
    if (!id) {
      return;
    }

    // Query the initial set of products
    DataStore.query(Product, (p) => p.shopID.eq(id)).then(setProducts);

    // Set up the subscription to changes in the Product model
    const subscription = DataStore.observe(Product).subscribe((msg) => {
      const updatedProduct = msg.element;
      const index = products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        // If the product is already in the products array, update it
        const updatedProducts = [...products];
        updatedProducts[index] = updatedProduct;
        setProducts(updatedProducts);
      } else if (updatedProduct.shopID === id) {
        // If the product is not in the products array, but belongs to the current shop, add it
        setProducts([...products, updatedProduct]);
      }
    });

    return () => subscription.unsubscribe();
  }, [id, products]);

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
          {/* <FlatList
            ListHeaderComponent={() => <StoreRoomHeader shop={shop} />}
            ListFooterComponent={() => <ListFooterComponent />}
            data={products}
            renderItem={({ item }) => <Items Item={item} />}
            keyExtractor={(item) => item.name}
          /> */}
          <FlatList
            ListHeaderComponent={() => <StoreRoomHeader shop={shop} />}
            ListFooterComponent={() => <ListFooterComponent />}
            data={products}
            renderItem={({ item }) => <Items Item={item} key={item.id} />}
            keyExtractor={(item) => item.id.toString()}
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
