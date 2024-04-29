import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import { Formik } from "formik";
import { signupSchema } from "../validations/validations";
import { signup } from "../services";

const RegistrationScreen = ({ navigation }) => {
  const initialValues = {
    // firstName: "",
    // lastName: "",
    email: "",
    password: "",
  };

  const handleSignUp = async (values) => {
    try {
      const { email, password } = values;
      const response = await signup({ email, password });
      const { user, token } = response.data;

      await AsyncStorage.setItem("token", token);

      console.log("Sign up successful:", email, password);

      navigation.navigate("Signin"); // Navigate to next screen on success
    } catch (error) {
      console.error("Sign up failed:", error);
      // Handle sign-up failure
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.inputContainer}>
            {/* <View style={styles.inputIconContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color="gray"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
              />
            </View>
            {errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}

            {/* Last Name Input */}
            {/* <View style={styles.inputIconContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color="gray"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
              />
            </View>
            {errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )} */}

            {/* Email Input */}
            <View style={styles.inputIconContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="gray"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            {/* Password Input */}
            <View style={styles.inputIconContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="gray"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View style={styles.horizontalLineContainer}>
        <View style={styles.horizontalLine} />
        <Text style={styles.orText}>Or continue with</Text>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="logo-google" size={40} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="logo-facebook" size={40} color="blue" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    position: "absolute",
    top: "15%",
    left: "5%",
  },
  inputContainer: {
    width: "90%",
    marginBottom: 20,
  },
  inputIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "black",
  },
  signUpButton: {
    backgroundColor: colors.primary,
    padding: 10,
    width: "100%",
    height: 50,
    borderRadius: 20,
    marginBottom: 40,
    // marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  horizontalLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  horizontalLine: {
    flex: 1,
    height: 1, // Adjust the height of the horizontal line as needed
    backgroundColor: "#727272", // You can adjust the color as needed
    marginHorizontal: 10, // Adjust the margin as needed
  },
  orText: {
    fontSize: 12,
    color: "#727272",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    marginHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
});

export default RegistrationScreen;
