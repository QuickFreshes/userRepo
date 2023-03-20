import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { DataStore } from "aws-amplify";
import { Order, Shop, Courier } from "../../models";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const OrderLiveUpdates = ({ id }) => {
  // const [order, setOrder] = useState(null);
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("HomeTab");
  };
  const [order, setOrder] = useState({
    order: { status: "Loading..." },
    shop: {},
    courier: {},
  });
  const [courier, setCourier] = useState(null);
  const mapRef = useRef(null);
  const [courierLocation, setCourierLocation] = useState({
    latitude: courier?.lat,
    longitude: courier?.lng,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const order = await DataStore.query(Order, id);
        if (order) {
          const shop = await DataStore.query(Shop, order.orderShopId);
          const courier = await DataStore.query(Courier, order.orderCourierId);
          setCourier(courier);
          // setOrder({
          //   order: order,
          //   shop: shop,
          //   courier: courier,
          // });
          setOrder({
            ...order,
            order: order,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!order) {
      return;
    }
    const subscription = DataStore.observe(Order, order.id).subscribe((msg) => {
      // console.log("Order update received:", msg);
      if (msg.opType === "UPDATE") {
        // setOrder(msg.element);
        setOrder({
          ...order,
          order: msg.element,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [order]);

  // console.log(courier?.lat, courier?.lng);
  useEffect(() => {
    if (!courier) {
      return;
    }
    const subscriptionCourier = DataStore.observe(
      Courier,
      courier.id
    ).subscribe((msg) => {
      if (msg.opType === "UPDATE") {
        setCourier(msg.element);
      }
    });
    return () => subscriptionCourier.unsubscribe();
  }, [courier]);

  useEffect(() => {
    if (courier && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: courier.lat,
          longitude: courier.lng,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        },
        1000
      );
    }
  }, [courier]);

  if (order?.order?.status === "NEW") {
    return (
      <ScrollView style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
        <View style={{ backgroundColor: "#FFD700", padding: 10 }}>
          <Text
            style={{
              padding: 7,
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            Status: {order?.order?.status || "Loading..."}{" "}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#FCF3CF",
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {/* <Ionicons name="checkmark-done-circle" size={100} color="green" /> */}
          <Text style={{ fontSize: 24, fontWeight: "600" }}>Order is NEW</Text>
          <Image
            style={{
              width: 250,
              height: 250,
              marginVertical: 40,
            }}
            source={{
              uri: "https://quickfreshesawsbucket.s3.ap-south-1.amazonaws.com/OrderCompleted.png",
            }}
          />
          <Pressable
            onPress={onPress}
            style={{
              backgroundColor: "black",
              flexDirection: "row",
              padding: 30,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 20,
                paddingRight: 10,
              }}
            >
              Lets Shop More
            </Text>
            <AntDesign name="arrowright" size={30} color="white" />
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  if (order?.order?.status === "COMPLETED") {
    return (
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: "#FCF3CF",
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Ionicons name="checkmark-done-circle" size={100} color="green" />
        <Text style={{ fontSize: 24, fontWeight: "600" }}>Order Completed</Text>
        <Image
          style={{
            width: 300,
            height: 300,
            marginVertical: 40,
          }}
          source={{
            uri: "https://quickfreshesawsbucket.s3.ap-south-1.amazonaws.com/OrderCompleted.png",
          }}
        />
        <View
          style={{
            backgroundColor: "black",
            flexDirection: "row",
            padding: 30,
            borderRadius: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: 20,
              paddingRight: 10,
            }}
          >
            Lets Shop More
          </Text>
          <AntDesign name="arrowright" size={30} color="white" />
        </View>
      </Pressable>
    );
  }

  return (
    <View>
      <View style={{ backgroundColor: "#FFD700", padding: 10 }}>
        <Text
          style={{
            padding: 7,
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Status: {order?.order?.status || "Loading..."}{" "}
        </Text>
      </View>
      {courier?.lat && courier?.lng && (
        <MapView
          style={styles.map}
          ref={mapRef}
          initialRegion={{
            latitude: courier?.lat,
            longitude: courier?.lng,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
          }}
          showsUserLocation={true}
          followUserLocation={true}
          zoomEnabled={true}
          pitchEnabled={true}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
        >
          {courier?.lat && courier?.lng && (
            <Marker
              coordinate={{
                latitude: courier?.lat,
                longitude: courier?.lng,
              }}
              title={courier?.name}
              description={courier?.phone_number}
            >
              <View
                style={{
                  backgroundColor: "#FFD700",
                  padding: 3,
                  borderRadius: 10,
                  borderRadius: 40,
                  borderWidth: 2,
                  borderColor: "black",
                }}
              >
                {courier?.transportationMode === "BIKE" ? (
                  <MaterialCommunityIcons
                    name="bike-fast"
                    size={24}
                    color="black"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="truck-delivery"
                    size={24}
                    color="black"
                  />
                )}
              </View>
            </Marker>
          )}
        </MapView>
      )}
    </View>
  );
};

export default OrderLiveUpdates;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
