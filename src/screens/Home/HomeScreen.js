import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  ScrollView,
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
  useEffect(() => {
    DataStore.query(User, (p) => p.sub.eq(sub)).then((user) => {
      setSelectedCity((prevSelectedCity) => ({
        ...prevSelectedCity,
        name: user[0]?.city,
        lat: user[0]?.lat,
        lng: user[0]?.lng,
      }));
    });
  }, [sub]);

  // console.log(selectedCity);

  useEffect(() => {
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
    const filteredShops = Shops.map((shop, index) => ({
      shop,
      distance: distances[index],
    }));
    setFilterShop(filteredShops);
  }, [Shops, distances]);

  // console.log(Shops);
  useEffect(() => {
    try {
      const sortShops = Shops.sort((a, b) => b.rating - a.rating);
      setSortedShops(sortShops);
    } catch (err) {
      console.log(err);
    }
  }, [Shops]);

  return (
    <View style={{ backgroundColor: "#FCF3CF" }}>
      <View style={{ backgroundColor: "#FFD700" }}>
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

            <Ionicons
              onPress={() => navigation.navigate("NotificationsScreen")}
              name="notifications"
              size={35}
              color="black"
              style={{ marginLeft: 6 }}
            />
          </View>
          {/* <Categories /> */}
        </View>
      </View>
      <View style={{ backgroundColor: "#ffe866" }}>
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
          ))}
        </ScrollView>
      </View>
      <View
        style={{ backgroundColor: "#FCF3CF" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ margin: 10 }}>
          <View>
            <View></View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ListHeaderComponent />
              {sortedShops.map((shop, index) => (
                <Stores shop={shop} key={index} distance={distances[index]} />
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

const styles = StyleSheet.create({});
