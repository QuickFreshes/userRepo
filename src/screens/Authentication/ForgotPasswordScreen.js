import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onSendPressed = async (data) => {
    try {
      await Auth.forgotPassword(data.username);
      navigation.navigate("NewPasswordScreen");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Reset your password</Text>
      <CustomInput
        name="username"
        placeholder="Username"
        control={control}
        rules={{
          required: "Username is required",
        }}
      />

      <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

      <CustomButton
        text="Back to Sign in"
        onPress={onSignInPressed}
        type="TERTIARY"
      />
    </View>
  );
};

export default ForgotPasswordScreen;

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
