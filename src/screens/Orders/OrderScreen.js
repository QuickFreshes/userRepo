import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import OrderListItem from "../../components/OrderListItem/OrderListItem";
// import orders from "../../../assets/data/Orders/orders.json";
import { useOrderContext } from "../../contexts/OrderContext";
import { ScrollView } from "react-native-gesture-handler";
import ListFooterComponent from "../../components/ListFooterComponent/ListFooterComponent";
import ListHeadOrderComponent from "../../components/ListHeadOrderComponent/ListHeadOrderComponent";
const OrderScreen = () => {
  const { orders } = useOrderContext();
  // console.log(orders);
  const [loadingTime, setLoadingTime] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTime(loadingTime + 1000);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [loadingTime]);

  if (!orders) {
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
    <View
      style={{
        backgroundColor: "#FCF3CF",
        flex: 1,
        width: "100%",
      }}
    >
      <FlatList
        ListHeaderComponent={() => <ListHeadOrderComponent />}
        ListFooterComponent={() => <ListFooterComponent />}
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <OrderListItem order={item} />}
        // key={key}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
