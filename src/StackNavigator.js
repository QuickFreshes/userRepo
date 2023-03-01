import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "./contexts/AuthContext";
import { Auth, Hub } from "aws-amplify";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
// Screen Starts
import OnboardingScreen from "./screens/Onboarding/OnboardingScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import SignInScreen from "./screens/Authentication/SignInScreen";
import SignUpScreen from "./screens/Authentication/SignUpScreen";
import ConformEmailScreen from "./screens/Authentication/ConformEmailScreen";
import ForgotPasswordScreen from "./screens/Authentication/ForgotPasswordScreen";
import NewPasswordScreen from "./screens/Authentication/NewPasswordScreen";
import SearchScreen from "./screens/Search/SearchScreen";
import SearchScreenStoreRoom from "./screens/Search/SearchScreenStoreRoom";
import OrderDetailsScreen from "./screens/Orders/OrderDetailsScreen";
import OrderScreen from "./screens/Orders/OrderScreen";
import Profile from "./screens/Profile/Profile";
import Notifications from "./screens/Notifications/Notifications";
import StoreRoom from "./screens/StoreRoom/StoreRoom";
import ItemDetailsScreen from "./screens/ItemDetails/ItemDetailsScreen";
import Basket from "./screens/Basket/Basket";
import FilterScreen from "./screens/Filters/FilterScreen";
import HomeSearch from "./screens/HomeSearch/HomeSearch";
import EditProfile from "./screens/Profile/EditProfile";
import OtherPlaces from "./screens/ProductOtherPlaces/OtherPlaces";
import OrderData from "./screens/OrderData/OrderData";
// Screen Ends

const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
      }}
      barStyle={{ backgroundColor: "black" }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
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
            <Entypo
              name="home"
              size={24}
              color={focused ? "#82e0aa" : "white"}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
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
            <FontAwesome
              name="search"
              size={24}
              color={focused ? "#82e0aa" : "white"}
            />
          ),
        })}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrderStackNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
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
            <AntDesign
              name="profile"
              size={24}
              color={focused ? "#82e0aa" : "white"}
            />
          ),
        })}
        // options={{
        //   tabBarIcon: ({ focused }) => (
        //     <AntDesign
        //       name="profile"
        //       size={24}
        //       color={focused ? "#82e0aa" : "white"}
        //     />
        //   ),
        // }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
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
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "#82e0aa" : "white"}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

// get tab visibility starts here

const getTabBarVisibility = (route) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  // console.log(routeName);

  if (
    routeName == "StoreRoom" ||
    routeName == "NotificationsScreen" ||
    routeName == "ItemDetails" ||
    routeName == "Basket" ||
    routeName == "HomeSearch" ||
    routeName == "FilterScreen" ||
    routeName == "OtherPlaces"
  ) {
    return "none";
  } else if (routeName == "Order") {
    return "none";
  } else if (routeName == "SearchScreenStoreRoom") {
    return "none";
  } else if (routeName == "EditProfile") {
    return "none";
  } else {
    return "flex";
  }
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="NotificationsScreen"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="StoreRoom"
        component={StoreRoom}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ItemDetails"
        component={ItemDetailsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Basket"
        component={Basket}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="OrderData"
        component={OrderData}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="HomeSearch"
        component={HomeSearch}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="OtherPlaces"
        component={OtherPlaces}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const SearchStack = createNativeStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="SearchScreenStoreRoom"
        component={SearchScreenStoreRoom}
        options={{ headerShown: false }}
      />
    </SearchStack.Navigator>
  );
};

const OrderStack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="Orders"
        component={OrderScreen}
        options={{ headerShown: false }}
      />
      <OrderStack.Screen
        name="Order"
        component={OrderDetailsScreen}
        options={{ headerShown: false }}
      />
    </OrderStack.Navigator>
  );
};

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const imageUrl =
    "https://quickfreshesawsbucket.s3.ap-south-1.amazonaws.com/FooterBigImg.png";
  const [user, setUser] = useState(undefined);
  const { dbUser } = useAuthContext();
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        checkUser();
      }
    };

    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);
  // When App is first launched
  const [firstLaunch, setFirstLaunch] = React.useState(null);
  //  This code is a React Hook that is checking if the app has been launched before. It uses the AsyncStorage API from react-native to store a value of whether the app has been launched or not.
  React.useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  if (user === undefined) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          flex: 1,
        }}
      >
        <Image
          style={{
            width: 320,
            height: 320,
            backgroundColor: "#000000",
          }}
          source={{ uri: imageUrl }}
        />
        {/* <ActivityIndicator /> */}
      </View>
    );
  }
  return (
    firstLaunch != null && (
      <NavigationContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "-64" : "0"}
          style={{ flex: 1 }}
        >
          <Stack.Navigator initialRouteName="HomeScreen">
            {user ? (
              <>
                {dbUser ? (
                  <Stack.Screen
                    name="HomeScreen"
                    component={Tabs}
                    options={{ headerShown: false }}
                  />
                ) : (
                  <Stack.Screen
                    name="Profile"
                    component={ProfileStackNavigator}
                    options={{ headerShown: false }}
                  />
                )}
              </>
            ) : (
              <>
                {firstLaunch && (
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="Onboarding"
                    component={OnboardingScreen}
                  />
                )}
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="SignIn"
                  component={SignInScreen}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="SignUp"
                  component={SignUpScreen}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="ConformEmailScreen"
                  component={ConformEmailScreen}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="ForgotPasswordScreen"
                  component={ForgotPasswordScreen}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="NewPasswordScreen"
                  component={NewPasswordScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </KeyboardAvoidingView>
      </NavigationContainer>
    )
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
