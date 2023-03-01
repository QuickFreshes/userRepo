import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Items from "../../components/StoreRoomHeader/Items";
import StoreRoomHeader from "../../components/StoreRoomHeader/StoreRoomHeader";
import { DataStore } from "aws-amplify";
import { Shop } from "../../models/index";
import { Product } from "../../models/index";
import { SafeAreaView } from "react-native-safe-area-context";
const SearchScreenStoreRoom = () => {
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    if (!id) {
      return;
    }
    DataStore.query(Shop, id).then(setShop);
    // DataStore.query(Product, (Product) => Product.shopID("eq", id)).then(
    //   setProducts
    // );  p => p.field.eq('value')
    DataStore.query(Product, (p) => p.shopID.eq(id)).then(setProducts);
  }, [id]);

  if (!shop) {
    return (
      <ActivityIndicator
        color="black"
        size="large"
        style={styles.activityIndicator}
      />
    );
  }
  return (
    <>
      <View style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
        <SafeAreaView>
          <FlatList
            ListHeaderComponent={() => <StoreRoomHeader shop={shop} />}
            data={products}
            renderItem={({ item }) => <Items Item={item} />}
            // keyExtractor={(item) => item.name}
          />
        </SafeAreaView>
      </View>
      {/* <ViewCart shopName={route.params.name} /> */}
      {/* <ViewCart shopName={shop.name} /> */}
    </>
  );
};

export default SearchScreenStoreRoom;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF3CF",
    height: 80,
  },
});
