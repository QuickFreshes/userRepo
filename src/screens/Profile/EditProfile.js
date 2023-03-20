import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { User } from "../../models/index";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton/BackButton";
import { GOOGLE_PLACES_API_KEY } from "../../../assets/secrets/secrets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const EditProfile = () => {
  const { dbUser } = useAuthContext();
  const [name, setName] = useState(dbUser?.name || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [city, setCity] = useState(dbUser?.city || "");
  const [phone_number, setPhoneNumber] = useState(dbUser?.phone_number || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "0");
  const [lng, setLng] = useState(dbUser?.lng + "" || "0");
  const { sub, setDbUser } = useAuthContext();

  const navigation = useNavigation();

  useEffect(() => {
    const subscription = DataStore.observe(User).subscribe((msg) => {
      // Update the user data in the component state whenever a change occurs
      setDbUser((user) => {
        if (user?.id === msg.element.id) {
          return msg.element;
        }
        return user;
      });
    });

    // Unsubscribe from the observable when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
    navigation.goBack();
  };

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.name = name;
        updated.address = address;
        updated.city = city;
        updated.phone_number = phone_number;
        updated.lat = parseFloat(lat);
        updated.lng = parseFloat(lng);
      })
    );
    setDbUser(user);
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(
        new User({
          name,
          address,
          city,
          phone_number,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          sub,
        })
      );
      setDbUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#FFD700",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          paddingRight: 110,
          flexDirection: "row",
        }}
      >
        <BackButton />
        <View style={{}}>
          {dbUser ? (
            <Text style={{ fontSize: 24, fontWeight: "500" }}>
              Edit Profile
            </Text>
          ) : (
            <Text style={{ fontSize: 24, fontWeight: "500" }}>
              Create Profile
            </Text>
          )}
        </View>
      </View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={phone_number}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        style={styles.input}
        keyboardType="numeric"
      />
      <GooglePlacesAutocomplete
        placeholder="Address"
        minLength={2}
        autoFocus={false}
        returnKeyType={"default"}
        fetchDetails={true}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
          // types: "(cities)",
        }}
        onPress={(data, details = null) => {
          setAddress(data.description);
          setCity(
            details.address_components.find((component) =>
              component.types.includes("locality")
            ).long_name
          );
          setLat(details.geometry.location.lat);
          setLng(details.geometry.location.lng);
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInputContainer: {
            width: "100%",
          },
          textInput: {
            backgroundColor: "#fff",
            borderRadius: 10,
            fontSize: 16,
            padding: 10,
            margin: 10,
          },
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
      />
      <View style={styles.styleLoginBtn}>
        <Button title="Save" color="black" onPress={onSave} />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
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
