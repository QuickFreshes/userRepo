import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
const Search = ({ searchQuery, setSearchQuery }) => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleSearch = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "gray",
          padding: 5,
          borderRadius: 6,
          marginBottom: 5,
          width: 300,
        }}
        onPressIn={handleFocus}
      >
        <FontAwesome
          name="search"
          style={{ paddingLeft: 7 }}
          size={24}
          color="#FFD700"
        />
        <TextInput
          // ref={inputRef}
          style={{
            paddingLeft: 5,
            fontWeight: "500",
            fontSize: 16,
            width: 300,
          }}
          placeholder="Shop name,Items,Products"
          placeholderTextColor="#82e0aa"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
          // returnKeyType="search"
          autoFocus={false}
          returnKeyType={"default"}
        />
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({});
