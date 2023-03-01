import {
  StyleSheet,
  View,
  Image,
  Alert,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import Icon from "../../../assets/icon.png";

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      await Auth.signIn(data.username, data.password);
      navigation.navigate("Home");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
    setLoading(false);
    // // Validate user
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPasswordScreen");
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };
  return (
    // <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Image
        source={Icon}
        style={(styles.Icon, { height: height * 0.3 })}
        resizeMode="contain"
      />
      <CustomInput
        name="username"
        placeholder="Username"
        control={control}
        rules={{ required: "Username is required" }}
      />
      <CustomInput
        placeholder="Password"
        name="password"
        control={control}
        secureTextEntry
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be minimum 8 characters long",
          },
        }}
      />
      <CustomButton
        text={loading ? "Loading..." : "Sign In"}
        onPress={handleSubmit(onSignInPressed)}
      />

      <CustomButton
        text="Forgot password?"
        onPress={onForgotPasswordPressed}
        type="TERTIARY"
      />

      <CustomButton
        text="Don't have an account? Create one"
        onPress={onSignUpPressed}
        type="TERTIARY"
      />
    </View>
    // </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
    flex: 1,
  },
  Icon: {
    height: 100,
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});
