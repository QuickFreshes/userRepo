import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Profile = () => {
  const { dbUser } = useAuthContext();
  const [name, setName] = useState(dbUser?.name || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [city, setCity] = useState(dbUser?.city || "");
  const [phone_number, setPhoneNumber] = useState(dbUser?.phone_number || "");

  const navigation = useNavigation();

  const signOut = () => {
    Auth.signOut();
  };

  if (dbUser) {
    if (!name && !address && !city && !phone_number) {
      return <ActivityIndicator size={60} color="#FFD700" />;
    }
  }

  return (
    <View style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: 40,
        }}
      >
        <View>
          {dbUser ? (
            <Text style={{ fontSize: 35, fontWeight: "700", width: 180 }}>
              {name}
            </Text>
          ) : (
            <Text style={{ fontSize: 14, fontWeight: "500" }}>Name</Text>
          )}
        </View>
        <Pressable onPress={() => navigation.navigate("EditProfile")}>
          <FontAwesome name="user-circle-o" size={80} color="black" />
          {dbUser ? (
            <Text style={{ fontSize: 14, fontWeight: "500" }}>
              Edit Profile
            </Text>
          ) : (
            <Text style={{ fontSize: 14, fontWeight: "500" }}>
              Create Profile
            </Text>
          )}
        </Pressable>
      </View>

      <View
        style={{ backgroundColor: "#000000", margin: 10, borderRadius: 10 }}
      >
        {address && city && phone_number ? (
          <View style={{ padding: 10 }}>
            <View>
              <Text
                style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "500" }}
              >
                ADDRESS
              </Text>
              <Text style={{ color: "#FFFFFF" }}>{address}</Text>
            </View>
            <View>
              <Text
                style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "500" }}
              >
                CITY
              </Text>
              <Text style={{ color: "#FFFFFF" }}>{city}</Text>
            </View>
            <View>
              <Text
                style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "500" }}
              >
                PHONE NUMBER
              </Text>
              <Text style={{ color: "#FFFFFF" }}>{phone_number}</Text>
            </View>
          </View>
        ) : (
          <Pressable
            onPress={() => navigation.navigate("EditProfile")}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View>
              <Text style={{ color: "#FFFFFF", padding: 20 }}>
                Create Profile
              </Text>
            </View>
            <View>
              <AntDesign name="arrowright" size={24} color="white" />
            </View>
          </Pressable>
        )}
      </View>

      <View style={styles.styleLoginBtn}>
        <Button title="Sign out" color="black" onPress={signOut} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
  styleLoginBtn: {
    marginTop: 5,
    marginLeft: 50,
    marginRight: 50,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "black", //button background/border color
    overflow: "hidden",
    marginBottom: 5,
  },
});
