import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Shop, User } from "../../models/index";
import { DataStore } from "aws-amplify";
import ListHeaderComponent from "../../components/ListHeaderComponent/ListHeaderComponent";
import ListFooterComponent from "../../components/ListFooterComponent/ListFooterComponent";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Categories from "../../components/Categories/Categories";
import Stores from "../../components/Stores/Stores";
import { useAuthContext } from "../../contexts/AuthContext";
import CategoriesData from "../../../assets/data/Categories/CategoriesData";
import Search from "../../components/SearchBar/Search";

// Function to calculate the distance between two coordinates using Haversine formula
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const HomeScreen = () => {
  const imageUrl =
    "https://quickfreshesawsbucket.s3.ap-south-1.amazonaws.com/FooterBigImg.png";
  const { sub } = useAuthContext();
  const [Shops, setShops] = useState([]);
  const [loadingTime, setLoadingTime] = useState(0);
  const [selectedCity, setSelectedCity] = useState({});
  const [distances, setDistances] = useState([]);
  const [filterShop, setFilterShop] = useState([]);
  const [sortedShops, setSortedShops] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setSortedShops([]);
  useEffect(() => {
    DataStore.query(User, (p) => p.sub.eq(sub)).then((user) => {
      setSelectedCity((prevSelectedCity) => ({
        ...prevSelectedCity,
        name: user[0]?.city,
        lat: user[0]?.lat,
        lng: user[0]?.lng,
      }));
    });
    // setRefreshing(false);
  }, [sub]);

  // console.log(selectedCity);
  const fetchData = async () => {
    // useEffect(() => {
    DataStore.query(Shop).then((Shops) => {
      const shopsWithinRange = Shops.filter((shop) => {
        const distance = getDistanceFromLatLonInKm(
          selectedCity.lat,
          selectedCity.lng,
          shop.lat,
          shop.lng
        );
        return distance <= 9; // 9 kilometers range
      });

      const shopDistances = shopsWithinRange.map((shop) => {
        const distance = getDistanceFromLatLonInKm(
          selectedCity.lat,
          selectedCity.lng,
          shop.lat,
          shop.lng
        );
        return distance;
      });
      setShops(shopsWithinRange);
      setDistances(shopDistances);
    });
  };
  // , [selectedCity]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedCity]);

  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTime(loadingTime + 1000);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [loadingTime]);

  if (!Shops) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
        }}
      >
        <ActivityIndicator size={60} color="#FFD700" />
        {/* <Text style={styles.indicatorText}>Loading Items...</Text> */}
        <Text style={styles.indicatorText}>
          {loadingTime > 60000
            ? "Sorry, no Shops found near your area"
            : "Loading Shops..."}
        </Text>
      </View>
    );
  }

  useEffect(() => {
    if (!Array.isArray(Shops)) {
      return;
    }

    const filteredShops = Shops.map((shop, index) => ({
      shop,
      distance: distances[index],
    }));
    setFilterShop(filteredShops);
  }, [Shops, distances]);

  useEffect(() => {
    // function sortShops() {
    let sortedShops = [];
    try {
      let sortedShops = Shops;
      if (
        Array.isArray(Shops) &&
        Shops.some((shop) => shop.rating !== undefined)
      ) {
        sortedShops = Shops.sort((a, b) => b.rating - a.rating);
      }
      setSortedShops(sortedShops);
    } catch (err) {
      console.log(err);
    }
  }, [Shops]);

  useEffect(() => {
    if (!Shops) {
      return;
    }
    const subscription = DataStore.observe(Shop).subscribe((msg) => {
      if (msg.opType === "INSERT" || msg.opType === "UPDATE") {
        setShops(msg.element);
      }
    });

    return () => subscription.unsubscribe();
  }, [Shops]);

  return (
    <View style={{ backgroundColor: "#F9F9F9" }}>
      <View style={styles.topContainer}>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Image
              style={{
                width: 80,
                height: 50,
                left: 10,
                borderRadius: 10,
              }}
              source={{ uri: imageUrl }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {/* <Search /> */}

            <FontAwesome
              onPress={() => navigation.navigate("HomeSearch")}
              name="search"
              style={{ paddingRight: 15 }}
              size={24}
              color="#000000"
            />
            {/* <Search /> */}
            {/* <ScrollView keyboardShouldPersistTaps="always"> */}

            {/* </ScrollView> */}

            <Ionicons
              onPress={() => navigation.navigate("NotificationsScreen")}
              name="notifications"
              size={35}
              color="#000000"
              style={{ marginLeft: 6 }}
            />
          </View>
          {/* <Categories /> */}
        </View>
      </View>
      <View style={styles.categories}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {CategoriesData.map((item, index) => (
            <Pressable
              key={item.id.toString()}
              onPress={() =>
                navigation.navigate("FilterScreen", {
                  // shops: Shops,
                  filterShop: filterShop,
                  name: item.name,
                  // distance: distances[index],
                })
              }
              style={styles.onPress}
            >
              <Text style={{ color: "#000000", fontWeight: "600" }}>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View
        style={styles.bottomHomeContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ margin: 16 }}>
          <View>
            <View></View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                  colors={["#000"]}
                />
              }
            >
              <ListHeaderComponent />
              {Array.isArray(sortedShops) &&
                sortedShops.map((shop, index) => (
                  <Stores
                    shop={shop}
                    key={`${index}-${shop.name}`}
                    distance={distances[index]}
                  />
                ))}
              <ListFooterComponent />
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  categories: {
    backgroundColor: "#F9F9F9",

    // backgroundColor: "white",
  },
  onPress: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    borderRadius: 7,
    //  --------------------------------------
    backgroundColor: "#FFFCE2",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 18,
    shadowColor: "#1DB954",
    shadowOffset: {
      width: 3,
      height: 80,
    },
    margin: 6,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  bottomHomeContainer: {
    backgroundColor: "#FFFCE2",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,

    // backgroundColor: "white",
    // borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 8,
    },
    margin: 6,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  topContainer: {
    backgroundColor: "#FFFCE2",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    margin: 6,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
});
