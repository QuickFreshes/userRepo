import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import NotificationsFilterModal from "../../components/FilterModal/NotificationsFilterModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const Notifications = () => {
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  return (
    <ScrollView style={{ backgroundColor: "#FCF3CF", flex: 1 }}>
      <View
        style={{
          padding: 12,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Notifications</Text>
        {showFilterModal && (
          <NotificationsFilterModal
            isVisible={showFilterModal}
            onClose={() => setShowFilterModal(false)}
          />
        )}
        <Feather
          onPress={() => setShowFilterModal(true)}
          name="sliders"
          size={27}
          color="black"
          style={{
            marginLeft: 6,
            padding: 4,
            borderRadius: 7,
          }}
        />
      </View>
      <View
        style={{
          borderColor: "#82e0aa",
          height: 1,
          borderWidth: 2,
        }}
      />
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
