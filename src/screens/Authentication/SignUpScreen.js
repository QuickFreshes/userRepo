import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const SignUpScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  const navigation = useNavigation();

  const onRegisterPressed = async (data) => {
    const { username, password, email, name } = data;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, name, preferred_username: username },
      });
      navigation.navigate("ConformEmailScreen", { username });
      console.log(response);
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
    //
    // console.log(data);
  };

  const onSignInPressed = () => {
    // console.warn("onSignInPressed");
    navigation.navigate("SignIn");
  };

  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  };

  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed");
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create an account</Text>

      <CustomInput
        name="name"
        rules={{
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Username should be at least 3 characters long",
          },
          maxLength: {
            value: 24,
            message: "Username should be max 24 characters long",
          },
        }}
        control={control}
        placeholder="Name"
      />

      <CustomInput
        name="username"
        rules={{
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username should be at least 3 characters long",
          },
          maxLength: {
            value: 24,
            message: "Username should be max 24 characters long",
          },
        }}
        control={control}
        placeholder="Username"
      />
      <CustomInput
        name="email"
        rules={{
          required: "Email is required",
          pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
        }}
        control={control}
        placeholder="Email"
      />
      <CustomInput
        name="password"
        control={control}
        placeholder="Password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be at least 8 characters long",
          },
        }}
        secureTextEntry={true}
      />
      <CustomInput
        name="password-repeat"
        control={control}
        placeholder="Repeat Password"
        rules={{
          validate: (value) => value === pwd || "Password do not match",
        }}
        secureTextEntry={true}
      />
      <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />

      <Text style={styles.text}>
        By registering, you confirm that you accept our{" "}
        <Text style={styles.link} onPress={onTermsOfUsePressed}>
          Terms of Use
        </Text>{" "}
        and
        <Text style={styles.link} onPress={onPrivacyPressed}>
          {" "}
          Privacy Policy
        </Text>
      </Text>

      {/* <SocialSignInButtons /> */}

      <CustomButton
        text="Have an account? Sign in"
        onPress={onSignInPressed}
        type="TERTIARY"
      />
    </View>
  );
};

export default SignUpScreen;

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
