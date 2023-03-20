import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import CameraSaveShare from "../../components/StoreRoomComponents/CameraSaveShare";
import PhotosAdd from "../../components/StoreRoomComponents/PhotosAdd";
import { AntDesign } from "@expo/vector-icons";
import ModeDelTimeOffers from "../../components/StoreRoomComponents/ModeDelTimeOffers";
import AdditionalDistanceFee from "../../components/StoreRoomComponents/AdditionalDistanceFee";
import BackButton from "../../components/BackButton/BackButton";
import { useOrderContext } from "../../contexts/OrderContext";
import { useRoute } from "@react-navigation/native";
import BasketProductItem from "../../components/BasketProductItem/BasketProductItem";
// import ActivityQuickIndicator from "../../components/ActivityIndicator/ActivityQuickIndicator";
const OrderDetailsScreen = ({ id, shopName, shopType, rating, address }) => {
  const [order, setOrder] = useState();
  const [loadingTime, setLoadingTime] = useState(0);
  const { getOrder } = useOrderContext();
  const route = useRoute();
  // const id = route.params?.id;

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTime(loadingTime + 1000);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [loadingTime]);

  if (!order) {
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
          {loadingTime > 60000 ? "Sorry, no items found" : "Loading Items..."}
        </Text>
      </View>
    );
  }
  // console.log(shopType);
  return (
    <View style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
      {/* <OrderDetailsHeader order={order} /> */}
      <View style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginRight: 10,
          }}
        >
          <BackButton />
          <CameraSaveShare />
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* StoreRoomHeader Starts */}
          <View style={{ marginLeft: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", width: 260 }}>
              {shopName}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "gray",
                fontWeight: "500",
                width: 260,
                marginVertical: 5,
              }}
            >
              {shopType}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#6082B6",
                fontWeight: "500",
                width: 260,
              }}
            >
              {/* {route?.params?.address} */}
              {address}
            </Text>
          </View>
          {/* StoreRoomHeader Ends */}
          <View>
            {/* Rating Section Starts */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "black",
                width: 90,
                padding: 7,
                alignItems: "center",
                justifyContent: "center",
                borderBottomLeftRadius: 7,
                borderTopLeftRadius: 7,
                marginVertical: 10,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#FFD700",
                  marginRight: 5,
                }}
              >
                {rating?.toFixed(1)}
              </Text>
              <AntDesign name="star" size={22} color="#FFD700" />
            </View>
            {/* Rating Section Ends */}
            <PhotosAdd />
          </View>
        </View>
        <ModeDelTimeOffers />
        <AdditionalDistanceFee />

        {order && (
          <FlatList
            data={order.PRoducts}
            renderItem={({ item, index }) => (
              <BasketProductItem Item={item} key={`item-${index}`} />
            )}
            keyExtractor={(item, index) => `item-${index}`}
          />
        )}
      </View>
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF3CF",
    height: 80,
  },
  indicatorText: {
    color: "#FFFFFF",
  },
});
