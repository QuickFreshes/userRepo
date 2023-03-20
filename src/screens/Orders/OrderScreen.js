import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import OrderListItem from "../../components/OrderListItem/OrderListItem";
import { useOrderContext } from "../../contexts/OrderContext";
import ListFooterComponent from "../../components/ListFooterComponent/ListFooterComponent";
import ListHeadOrderComponent from "../../components/ListHeadOrderComponent/ListHeadOrderComponent";
const OrderScreen = () => {
  const { orders, refreshOrders } = useOrderContext();
  // console.log(orders);
  const [loadingTime, setLoadingTime] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingTime(loadingTime + 1000);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [loadingTime]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshOrders();
    setRefreshing(false);
  };

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

  orders.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // console.log(orders);
  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={["#000"]}
            // tintColor="#FFD700"
            // colors={["#9Bd35A", "#689F38"]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFCE2",
    flex: 1,
    width: "100%",
  },
});
