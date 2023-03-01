import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "../BackButton/BackButton";
import Search from "../SearchBar/Search";

const HomeSearchHeader = ({ setSearchQuery, searchQuery }) => {
  return (
    <View
      style={{
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFD700",
      }}
    >
      <View style={{ right: 2 }}>
        <BackButton />
      </View>
      <View style={{ top: 5, right: 3 }}>
        <Search
          placeholder="Search"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>
    </View>
  );
};

export default HomeSearchHeader;

const styles = StyleSheet.create({});
