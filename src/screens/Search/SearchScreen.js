import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Search from "../../components/SearchBar/Search";
import { ScrollView } from "react-native-gesture-handler";
import { Shop } from "../../models/index";
import { DataStore } from "aws-amplify";
import { Feather } from "@expo/vector-icons";
import SearchStores from "../../components/SearchStores/SearchStores";
import FilterModal from "../../components/FilterModal/FilterModal";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
const SearchScreen = () => {
  const [Shops, setShops] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    DataStore.query(Shop).then(setShops);
  }, []);
  const data = Shops;
  const imageUrl =
    "https://quickfreshesawsbucket.s3.ap-south-1.amazonaws.com/FooterBigImg.png";
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  return (
    <View style={{ backgroundColor: "#FCF3CF" }}>
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 10,
            backgroundColor: "#FFD700",
          }}
        >
          <FontAwesome
            onPress={() => navigation.navigate("HomeSearch")}
            name="search"
            style={{ paddingRight: 25 }}
            size={24}
            color="#000000"
          />

          {/* Filter */}
          {showFilterModal && (
            <FilterModal
              isVisible={showFilterModal}
              onClose={() => setShowFilterModal(false)}
            />
          )}
          {/* Filter */}
          <Feather
            onPress={() => setShowFilterModal(true)}
            name="sliders"
            size={27}
            color="white"
            style={{
              marginLeft: 6,
              backgroundColor: "black",
              padding: 4,
              marginRight: 7,
              borderRadius: 7,
            }}
          />
        </View>
        {/* Rendering list starts */}

        <ScrollView
          style={{ marginLeft: 10, marginRight: 10 }}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
          showsVerticalScrollIndicator={false}
          // style={{ flexDirection: "row", flexWrap: "wrap" }}
        >
          {data.map((item, id) => {
            return (
              <View key={id} style={{ width: "50%", flexDirection: "row" }}>
                <SearchStores shop={item} />
              </View>
            );
          })}

          <Image
            style={{
              width: 150,
              height: 120,
              left: 20,
              marginTop: 50,
              marginBottom: 250,
              borderRadius: 20,
            }}
            source={{ uri: imageUrl }}
          />
        </ScrollView>
        {/* Rendering list ends */}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
