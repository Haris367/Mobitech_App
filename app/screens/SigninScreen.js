import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import { Formik, useFormik, validateYupSchema } from "formik";
import * as Yup from "yup"; // Import Yup for validation

import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import { loginSchema } from "../validations/validations";
import { login } from "../services";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    console.log(email, password);
    const userData = {
      email: email,
      password,
    };
    axios
      .post("http://localhost:5000/api/users/login", userData)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));

    // try{

    //   const { email, password } = values;

    //   const response = await login({
    //     email,
    //     password
    //   }).then(() => {
    //     if(response.status==200){
    //       AsyncStorage.setItem("Access Token", response.data);
    //       console.log("success")
    //       navigation.navigate("Bottom Navigation");

    //     }
    //   })
    // }
    // catch (error){
    //   console.log(error);
    // }
  }

  // const handleLogin = async (values) => {

  //   try {
  //     const { email, password } = values;
  //     const response = await login({ email, password });
  //     // console.log("====================================");
  //     console.log("response", response);
  //     // console.log("====================================");
  //     const { user, token } = response.data;

  //     // Store token in AsyncStorage
  //     await AsyncStorage.setItem("token", token);

  //     // Dispatch action to Redux store (assuming you're using Redux)
  //     const dispatch = useDispatch();
  //     dispatch({ type: "LOGIN", payload: { id: user.userId, email } });
  //     // ale;
  //     // Navigate to dashboard screen
  //     navigation.navigate("Bottom Navigation");
  //   } catch (error) {
  //     console.error(error);
  //     // navigation.navigate("Bottom Navigation");

  //     // Handle login failure
  //   }
  // };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Login</Text>

      <Formik
        // initialValues={initialValues}
        validationSchema={loginSchema}
      >
        {({ errors }) => (
          <View style={styles.inputContainer}>
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
              />
            </View>
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
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
                secureTextEntry={showPassword}
              />
              <TouchableOpacity
                onPress={toggleShowPassword}
                style={styles.eyeButton}
              >
                {password.length > 1 ? null : showPassword ? (
                  <Ionicons
                    name="eye-off"
                    style={{ marginRight: 10 }}
                    size={20}
                    color={colors.primary}
                  />
                ) : (
                  <Ionicons
                    name="eye"
                    size={20}
                    style={{ marginRight: 10 }}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <View style={styles.row}>
              {/* <View style={styles.rememberMeContainer}>
                <TouchableOpacity
                  // onPress={() => handleChange("rememberMe")(!values.rememberMe)}
                  style={styles.checkbox}
                >
                  {values.rememberMe && (
                    <Ionicons
                      name="checkbox-outline"
                      size={24}
                      color={colors.primary}
                    />
                  )}
                  {!values.rememberMe && (
                    <Ionicons name="square-outline" size={24} color="gray" />
                  )}
                </TouchableOpacity>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View> */}
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.signUpTextContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.signUpLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        padding: 50,
      },
      android: {
        padding: 20,
      },
    }),
    top: 25,
  },
  backButton: {
    position: "absolute",
    top: "5%",
    left: "5%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    // marginBottom: 0,
    position: "absolute",
    top: "15%",
    left: "10%",
  },
  inputContainer: {
    width: "90%",
    // marginBottom: 20,
    position: "absolute",
    top: "25%",
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
  input: {
    flex: 1,
    height: 50,
    color: "black",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40%",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 5,
  },
  rememberMeText: {
    fontSize: 14,
  },
  forgotPassword: {
    fontStyle: "italic",
  },
  loginButton: {
    backgroundColor: colors.primary,
    padding: 10,
    width: "100%",
    height: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
  signUpTextContainer: {
    flexDirection: "row",
    // marginTop: "90%",
    padding: "2%",
    justifyContent: "center",
  },
  signUpText: {
    color: "black",
  },
  signUpLink: {
    fontWeight: "bold",
  },
});

export default SigninScreen;
