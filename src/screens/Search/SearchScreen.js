import {
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    DataStore.query(Shop).then(setShops);
  }, []);
  const data = Shops;
  const imageUrl =
    "https://quickfreshesawsbucket.s3.ap-south-1.amazonaws.com/FooterBigImg.png";
  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    const refreshedData = await DataStore.query(Shop);
    setShops(refreshedData);
    setRefreshing(false);
  };

  return (
    <View style={styles.topSearchContainer}>
      <View style={{}}>
        <View style={styles.backgroundColor}>
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
            style={styles.slider}
          />
        </View>
        {/* Rendering list starts */}

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {data.map((item, id) => {
            return (
              <View key={id} style={styles.cardList}>
                <SearchStores shop={item} />
              </View>
            );
          })}

          <Image style={styles.cardImage} source={{ uri: imageUrl }} />
        </ScrollView>
        {/* Rendering list ends */}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  topSearchContainer: {
    backgroundColor: "#F9F9F9",
  },
  cardImage: {
    width: 150,
    height: 120,
    left: 20,
    marginTop: 50,
    marginBottom: 300,
    borderRadius: 20,
  },
  cardList: {
    width: "50%",
    flexDirection: "row",
  },
  scrollContainer: {
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#FFFCE2",
    padding: 5,
    // backgroundColor: "#000000",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  slider: {
    marginLeft: 6,
    backgroundColor: "black",
    padding: 8,
    marginRight: 7,
    borderRadius: 7,
    borderBottomRightRadius: 18,
  },
  backgroundColor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
    // backgroundColor: "#F9F9F9",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#FFFCE2",
    borderRadius: 10,
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
});
