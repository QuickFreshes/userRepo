import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Shop } from "../../models/index";
import PlacesComponent from "../../components/ItemPlacesComponent/PlacesComponent";
import ListFooterComponent from "../../components/ListFooterComponent/ListFooterComponent";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import BackButton from "../../components/BackButton/BackButton";
import { Entypo } from "@expo/vector-icons";

const OtherPlaces = () => {
  const [loadingTime, setLoadingTime] = useState(0);
  const [Shops, setShops] = useState([]);
  const route = useRoute();
  const name = route.params?.name;
  const lat = route.params?.lat;
  const lng = route.params?.lng;

  useEffect(() => {
    DataStore.query(Shop).then(setShops);
  }, []);

  // Define the center coordinates and the radius of the search area
  const centerLat = lat;
  const centerLng = lng;
  //   console.log(lat, lng);
  //   const centerLat = 28.7041;
  //   const centerLng = 77.1025;
  const radius = 20000; // in meters

  // Filter the shops within the search radius
  const filteredShops = Shops.filter((shop) => {
    const distance =
      getDistanceFromLatLonInKm(centerLat, centerLng, shop.lat, shop.lng) *
      1000;
    return distance <= radius;
  });

  // Define a function to calculate the distance between two points using the Haversine formula
  function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLng = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTime(loadingTime + 1000);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [loadingTime]);

  if (!filteredShops) {
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

        <Text style={styles.indicatorText}>
          {loadingTime > 30000
            ? "Go back and come back again to this Shop"
            : "Loading Items..."}
        </Text>
      </View>
    );
  }
  // Render the list of filtered shops using FlatList

  return (
    <View>
      <View
        style={{
          backgroundColor: "#FFD700",
          alignItems: "center",
          padding: 10,
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <BackButton />
        <Text
          style={{
            fontSize: 20,
            color: "#82e0aa",
            fontWeight: "500",
            backgroundColor: "#000000",
            padding: 5,
            borderRadius: 10,
            marginLeft: 90,
          }}
        >
          {name}
        </Text>
      </View>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredShops.length > 0 ? (
            filteredShops.map((shop, index) => (
              <PlacesComponent shop={shop} key={index} />
            ))
          ) : (
            <View
              style={{
                alignItems: "center",
                paddingTop: 40,
                backgroundColor: "#FCF3CF",
              }}
            >
              <Entypo name="emoji-sad" size={80} color="black" />
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                Sorry!!! no shops found
              </Text>
            </View>
          )}

          {/* {filteredShops.map((shop, index) => (
            <PlacesComponent shop={shop} key={index} />
          ))} */}
          <ListFooterComponent />
        </ScrollView>
      </View>
    </View>
  );
};
// <Stores shop={shop} key={index} distance={distances[index]} />
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FCF3CF",
  },
  shop: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  shopAddress: {
    fontSize: 14,
    color: "#666",
  },
});

export default OtherPlaces;
