import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

const CustomInput = ({
  control,
  rules = {},
  name,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View
              style={[
                styles.container,
                { borderColor: error ? "red" : "#FFD700" },
              ]}
            >
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.textInputColor}
                secureTextEntry={secureTextEntry}
              />
            </View>
            {error && (
              <Text style={{ color: "red", alignSelf: "stretch" }}>
                {error.message || "Error"}
              </Text>
            )}
          </>
        )}
      />
      {/* </View> */}
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    borderColor: "#FFD700",
    borderWidth: 3,
    borderRadius: 20,
    width: "100%",
    marginVertical: 10,
  },
  textInputColor: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 30,
    width: "100%",
    fontSize: 17,
    fontWeight: "500",
  },
});
