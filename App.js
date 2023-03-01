import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import GeneralStatusBarColor from "./src/components/StatusBar/GeneralStatusBarColor";
import StackNavigator from "./src/StackNavigator";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import { Auth } from "aws-amplify";
import AuthContextProvider from "./src/contexts/AuthContext";
import BasketContextProvider from "./src/contexts/BasketContext";
import OrderContextProvider from "./src/contexts/OrderContext";
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "./src/utils/pushNotifications";

Amplify.configure(config);
const App = () => {
  useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();
      console.log(token);
    })();
  }, []);
  // Auth.signOut();
  return (
    <View style={styles.container}>
      <GeneralStatusBarColor
        backgroundColor="#FFD700"
        barStyle="dark-content"
      />
      <AuthContextProvider>
        <BasketContextProvider>
          <OrderContextProvider>
            <StackNavigator />
          </OrderContextProvider>
        </BasketContextProvider>
      </AuthContextProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
});

export default App;
