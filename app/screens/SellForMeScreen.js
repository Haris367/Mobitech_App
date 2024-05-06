import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import style from "../config/style";
import { addNewProduct } from "../services/products";
import { Formik, useFormik } from "formik";

// import DocumentPicker from 'react-native-document-picker';

export default function SellForMeScreen({ navigation }) {
    const handleImage = async () => {
      // try {
      //   const img = await DocumentPicker.pick();
      //     console.log(img);
      // }
      // catch (err) {
      //   console.log(err)
      // }
    };

  const formik = useFormik({
    initialValues: {
      userName: "",
      emailAddress: "",
      phoneNumber: "",
      address: "",
      modelName: "",
      mobileDescription: "",
      inspectionSlot: "",
      inspectionTime: "",
    },
    onSubmit: async (values) => {
      handleRequest(values);
      console.log(values);
    },
  });

  const handleRequest = async (data) => {
    try {
      const {
        userName,
        emailAddress,
        phoneNumber,
        address,
        modelName,
        mobileDescription,
        inspectionSlot,
        inspectionTime,
      } = data;

      const response = await saveSellRequest({
        userName,
        emailAddress,
        phoneNumber,
        address,
        modelName,
        mobileDescription,
        inspectionSlot,
        inspectionTime,
      });
      console.log("succes", response);
      Alert.alert("Success", "Sell Request sent successfully");
    } catch (error) {
      console.log("fail");
      Alert.alert("Error", "Failed to send sell request. Please try again later.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
          <TouchableOpacity
            style={{ left: 10, top: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color={colors.primary}
              style={{ top: -10 }}
            />
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <Formik onSubmit={formik.handleSubmit}>
              <View>
                <TouchableOpacity style={styles.imageButton}>
                  <Text style={{ fontSize: 20, color: colors.white }}>
                    +Upload Image
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Your Name"
                  value={formik.values.userName}
                  onChangeText={formik.handleChange("userName")}
                />
                  <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={formik.values.emailAddress}
                  onChangeText={formik.handleChange("emailAddress")}
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={formik.values.phoneNumber}
                  onChangeText={formik.handleChange("phoneNumber")}
                  keyboardType="phone-pad"
                />
                  <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={formik.values.address}
                  onChangeText={formik.handleChange("address")}
                  multiline
                />
                <TextInput
                  style={styles.input}
                  placeholder="Model Name"
                  value={formik.values.modelName}
                  onChangeText={formik.handleChange("modelName")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={formik.values.mobileDescription}
                  onChangeText={formik.handleChange("mobileDescription")}
                  multiline
                />
                  <TextInput
                   style={styles.input}
                   placeholder="Inspection Slot"
                   value={formik.values.inspectionSlot}
                   onChangeText={formik.handleChange("inspectionSlot")}
                 />
                 <TextInput
                  style={styles.input}
                  placeholder="Inspection Time"
                  value={formik.values.inspectionTime}
                  onChangeText={formik.handleChange("inspectionTime")}
                />
              </View>
            </Formik>
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={formik.handleSubmit}
          >
            <Text style={[styles.buttonText, { color: colors.white }]}>
              Done
            </Text>
          </TouchableOpacity>
          <View></View>
          <View></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    marginTop: 40,
    left: 20,
  },
  inputContainer: {
    // top: 30,
  },
  input: {
    width: "90%",
    height: 50,
    paddingLeft: 20,
    left: 10,
    color: "black",
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 10,
  },
  imageButton: {
    width: "60%",
    height: 100,
    // paddingLeft: 5,

    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 70,
    left: 55,
  },
  saveButton: {
    width: "70%",
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.primary, // Set background color here
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    left: 55,
  },
});
