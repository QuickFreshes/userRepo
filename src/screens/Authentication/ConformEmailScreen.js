import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const ConformEmailScreen = () => {
  const route = useRoute();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { username: route?.params?.username },
  });

  const username = watch("username");

  const navigation = useNavigation();

  const onConfirmPressed = async (data) => {
    try {
      const response = await Auth.confirmSignUp(data.username, data.code);
      console.log(response);
      navigation.navigate("SignIn");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
    // console.warn("onConfirmPressed");
    //
  };

  const onSignInPressed = () => {
    // console.warn("onSignInPressed");
    navigation.navigate("SignIn");
  };

  const onResendPressed = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert("Success", "Code was resent to your email");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Confirm your email</Text>
      <CustomInput
        name="username"
        control={control}
        placeholder="Username"
        rules={{
          required: "Username code is required",
        }}
      />

      <CustomInput
        name="code"
        control={control}
        placeholder="Enter your confirmation code"
        rules={{
          required: "Confirmation code is required",
        }}
      />

      <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

      <CustomButton
        text="Resend code"
        onPress={onResendPressed}
        type="SECONDARY"
      />

      <CustomButton
        text="Back to Sign in"
        onPress={onSignInPressed}
        type="TERTIARY"
      />
    </View>
  );
};

export default ConformEmailScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
    flex: 1,
    maxHeight: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    margin: 10,
  },
  text: {
    color: "#FFFFFF",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});
