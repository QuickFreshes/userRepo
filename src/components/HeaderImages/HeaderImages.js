import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import HeaderImageData from "../../../assets/data/HeaderImage/HeaderImageData";

const HeaderImages = () => {
  const items = HeaderImageData;
  return (
    <View style={{}}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Shop from top Stores in your city
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={items}
        renderItem={({ item }) => (
          <Pressable style={styles.ShopFromTopStores}>
            <View style={styles.imageView}>
              <Image
                style={styles.image}
                source={{
                  uri: item.image,
                }}
              />

              <Text style={styles.imageText}>{item.name}</Text>
              <Text style={styles.imageButton}>Purchase</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

// export default HeaderImages;
export default React.memo(HeaderImages);

const styles = StyleSheet.create({
  ShopFromTopStores: {
    margin: 4,
    alignItems: "center",
    backgroundColor: "#F8FFEE",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  image: {
    height: 170,
    width: 300,
    margin: 8,
    borderRadius: 10,
  },
  imageView: {
    alignItems: "center",
  },
  imageText: {
    bottom: 170,
    fontWeight: "bold",
    right: -90,
    width: 110,
    fontSize: 15,
    backgroundColor: "black",
    color: "white",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 5,
  },
  imageButton: {
    bottom: 90,
    marginBottom: -70,
    right: 90,
    fontWeight: "bold",
    backgroundColor: "black",
    color: "#82e0aa",
    padding: 5,
    borderRadius: 15,
    fontSize: 16,
  },
});
