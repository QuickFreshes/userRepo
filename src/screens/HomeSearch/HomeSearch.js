import { StyleSheet, Text, ScrollView, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Shop } from "../../models";
import StoresTextSearch from "../../components/Stores/StoresTextSearch";
import { DataStore } from "aws-amplify";
import HomeSearchHeader from "../../components/ListHeaderComponent/HomeSearchHeader";
const HomeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [Shops, setShops] = useState([]);
  useEffect(() => {
    DataStore.query(Shop).then(setShops);
    // DataStore.query(Shop, (q) => q.location.eq(City)).then(setShops);
  }, []);
  const filteredShops = Shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
      <FlatList
        ListHeaderComponent={() => (
          <HomeSearchHeader
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
        )}
        // data={Shops}
        data={filteredShops}
        renderItem={({ item }) => <StoresTextSearch shop={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({});
