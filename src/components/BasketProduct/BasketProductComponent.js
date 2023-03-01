import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { AntDesign } from "@expo/vector-icons";
import { useBasketContext } from "../../contexts/BasketContext";
import { BasketProduct } from "../../models";
import { Product } from "../../models";
const BasketProductComponent = ({ basketproduct }) => {
  const [quantity, setQuantity] = useState(basketproduct.quantity);
  // const [qty, setqty] = useState(null);
  const [product, setProduct] = useState(null);
  const { onminus, onplus } = useBasketContext();

  const fetchProduct = async () => {
    try {
      const productData = await DataStore.query(
        Product,
        basketproduct?.Product?.id
      );
      setProduct(productData);
    } catch (error) {
      console.error(`Failed to fetch product: ${error}`);
    }
  };

  useEffect(() => {
    fetchProduct(); // Call fetchProduct() inside useEffect with an empty dependency array to only run it once when the component mounts.
  }, []);

  if (!product) {
    // return null; // you can display a loading indicator or message here
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // if (isLoading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }
  // console.log(basketproduct);

  const onPlus = async () => {
    const updatedQuantity = quantity + 1;
    console.log(updatedQuantity);
    if (updatedQuantity > 0) {
      const original = await DataStore.query(BasketProduct, basketproduct.id);
      const updated = BasketProduct.copyOf(original, (updated) => {
        updated.quantity = updatedQuantity;
      });
      const savedBasketProduct = await DataStore.save(updated);
      setQuantity(savedBasketProduct.quantity);
      console.log(savedBasketProduct);
    }
  };

  const onMinus = async () => {
    const updatedQuantity = quantity - 1;
    console.log(updatedQuantity);
    if (updatedQuantity > 0) {
      const original = await DataStore.query(BasketProduct, basketproduct.id);
      const updated = BasketProduct.copyOf(original, (updated) => {
        updated.quantity = updatedQuantity;
      });
      const savedBasketProduct = await DataStore.save(updated);
      setQuantity(savedBasketProduct.quantity);
      console.log(savedBasketProduct);
    }
  };

  const removeBasketProduct = async () => {
    try {
      const basketProduct = await DataStore.query(
        BasketProduct,
        basketproduct.id
      );
      await DataStore.delete(basketProduct);
      console.log(
        `BasketProduct with ID ${basketproduct.id} has been removed.`
      );
    } catch (error) {
      console.error(
        `Failed to remove BasketProduct with ID ${basketproduct.id}: ${error}`
      );
    }
  };

  return (
    <View style={styles.productsContainer}>
      <View>
        <Text style={styles.name}>{product?.name}</Text>
        <Text style={styles.description}>{product?.description}</Text>
      </View>

      <View>
        <Button onPress={removeBasketProduct} title="Remove" />

        <View style={styles.row}>
          <AntDesign
            name="minuscircleo"
            size={40}
            color={"black"}
            onPress={onMinus}
            // onPress={() => onMinus(basketproduct)}
          />
          <Text style={styles.quantity}>{quantity}</Text>
          <AntDesign
            name="pluscircleo"
            size={40}
            color={"black"}
            onPress={onPlus}
            // onPress={() => onPlus(basketproduct)}
          />
        </View>
        <Text style={{ fontWeight: "600" }}>
          ₹ {basketproduct?.Product?.price}
        </Text>
      </View>
    </View>
  );
};

export default BasketProductComponent;

const styles = StyleSheet.create({
  productsContainer: {
    flexDirection: "row",
    borderColor: "lightgrey",
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  page: {
    backgroundColor: "#FCF3CF",
    flex: 1,
    paddingVertical: 10,
    padding: 10,
  },
  BasketTitle: {
    fontSize: 30,
    fontWeight: "600",
    color: "#FFD700",
  },
  shopTitle: {
    fontSize: 30,
    fontWeight: "600",
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    width: 200,
  },
  description: {
    color: "#696969",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    bottom: 25,
    right: 25,
  },
  quantity: {
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#FFD700",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginTop: "auto",
    // marginBottom: 80,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
