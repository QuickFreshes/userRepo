import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrderDetailsScreen from "./screens/Orders/OrderDetailsScreen";
import OrderLiveUpdates from "./screens/OrderLiveUpdates/OrderLiveUpdates";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const Tab = createMaterialTopTabNavigator();
const OrderDetailsNavigator = ({ route }) => {
  const id = route?.params?.id;
  const shopName = route?.params?.shopName;
  const shopType = route?.params?.shopType;
  const rating = route?.params?.rating;
  const smalladdress = route?.params?.small_address;
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Details"
        options={({ route }) => ({
          tabBarStyle: {
            // display: getTabBarVisibility(route),
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#000",
            borderRadius: 15,
            height: 60,
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <AntDesign
                name="profile"
                size={24}
                color={focused ? "#82e0aa" : "white"}
              />
              <Text style={{ color: "white", width: 50 }}>Orders</Text>
            </View>
          ),
        })}
      >
        {() => (
          <OrderDetailsScreen
            id={id}
            shopName={shopName}
            shopType={shopType}
            rating={rating}
            address={smalladdress}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Updates"
        options={({ route }) => ({
          tabBarStyle: {
            // display: getTabBarVisibility(route),
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#000",
            borderRadius: 15,
            height: 60,
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <MaterialCommunityIcons
                name="bike-fast"
                size={24}
                color={focused ? "#82e0aa" : "white"}
              />
              <Text style={{ color: "white", width: 150, paddingLeft: 30 }}>
                Track Order
              </Text>
            </View>
          ),
        })}
      >
        {() => <OrderLiveUpdates id={id} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default OrderDetailsNavigator;

const styles = StyleSheet.create({});
