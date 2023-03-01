import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const NewPasswordScreen = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const onSubmitPressed = async (data) => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      navigation.navigate("SignIn");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Reset New password</Text>
      <CustomInput
        placeholder="Username"
        name="username"
        control={control}
        rules={{ required: "Username is required" }}
      />
      <CustomInput
        placeholder="Code"
        name="code"
        control={control}
        rules={{ required: "Code is required" }}
      />

      <CustomInput
        placeholder="Enter your new password"
        name="password"
        control={control}
        secureTextEntry
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be at least 8 characters long",
          },
        }}
      />

      <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

      <CustomButton
        text="Back to Sign in"
        onPress={onSignInPressed}
        type="TERTIARY"
      />
    </View>
  );
};

export default NewPasswordScreen;

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
