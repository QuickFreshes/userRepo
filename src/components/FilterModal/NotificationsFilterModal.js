import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const Section = ({ title, children }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};
const NotificationsFilterModal = ({ isVisible, onClose }) => {
  const [showFilterModal, setShowFilterModal] = React.useState(isVisible);
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    // if (!showFilterModal) {
    //   onClose();
    // }
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1200, 180],
  });
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.42)" }}>
        {/* Transparent Background */}
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: modalY,
            width: "100%",
            height: "100%",
            // padding: 15,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "black",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 15,
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              Filter Your Search
            </Text>
            <AntDesign
              name="closecircle"
              size={24}
              color="#FFD700"
              onPress={() => setShowFilterModal(false)}
            />
          </View>
          <View
            style={{
              borderColor: "#82e0aa",
              height: 1,
              borderWidth: 2,
            }}
          />
          <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default NotificationsFilterModal;

const styles = StyleSheet.create({});
