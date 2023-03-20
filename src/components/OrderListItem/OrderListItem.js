import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
const OrderListItem = (props) => {
  const order = props?.order;
  const navigation = useNavigation();
  // console.log(order);
  const onPress = () => {
    navigation.navigate("Order", {
      // screen: "Details",
      // params: {
      id: order.id,
      shopName: order?.Shop?.name,
      shopType: order?.Shop?.ShopType,
      rating: order?.Shop?.rating,
      address: order?.Shop?.small_address,
      productsId: order?.OrderProducts?.orderProductProductId,
      // },
    });
  };

  const [loadingTime, setLoadingTime] = useState(0);
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

        <Text style={styles.indicatorText}>
          {loadingTime > 30000
            ? "Go back and come back again to but your order is placed"
            : "Loading Items..."}
        </Text>
      </View>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        margin: 10,
        borderWidth: 2,
        padding: 5,
        borderColor: "#FFD700",
        borderRadius: 10,
        backgroundColor: "black",
      }}
    >
      <Image
        source={{ uri: order?.Shop?.image }}
        style={{ width: 100, height: 100, borderRadius: 10, marginRight: 10 }}
      />
      <View>
        <Text style={{ width: 230, fontWeight: "bold", color: "#FFD700" }}>
          {order?.Shop?.name}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#FFD700" }}>
            {order?.OrderProducts?.length} • items
          </Text>
          <Text style={{ color: "#FFD700" }}>
            {" "}
            | ₹{order?.total?.toFixed(0)}
          </Text>
        </View>
        <Text style={{ color: "#FFD700" }}>
          {moment(order?.createdAt).fromNow()} • {order?.status}
          {/* {new Date(order?.createdAt).toLocaleDateString()} • {order?.status} */}
        </Text>
      </View>
    </Pressable>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({});
