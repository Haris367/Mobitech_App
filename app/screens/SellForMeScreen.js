import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import { Formik, useFormik } from "formik";

export default function SellForMeScreen({ navigation }) {
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
      handleAddProduct(values);
      console.log(values);
    },
  });

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
          <View>
            <Formik onSubmit={formik.handleSubmit}>
              <View>
                <TouchableOpacity style={styles.imageButton}>
                  <Text style={{ fontSize: 20, color: colors.white }}>
                    +Upload Image
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Name*"
                  value={formik.values.userName}
                  onChangeText={formik.handleChange("userName")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email*"
                  value={formik.values.emailAddress}
                  onChangeText={formik.handleChange("emailAddress")}
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number*"
                  value={formik.values.phoneNumber}
                  onChangeText={formik.handleChange("phoneNumber")}
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address*"
                  value={formik.values.address}
                  onChangeText={formik.handleChange("address")}
                  multiline
                  keyboardType="default"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Model Name*"
                  value={formik.values.modelName}
                  onChangeText={formik.handleChange("modelName")}
                  keyboardType="default"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Description*"
                  value={formik.values.mobileDescription}
                  onChangeText={formik.handleChange("mobileDescription")}
                  multiline
                  keyboardType="default"
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
            <Text style={{ color: colors.white }}>Add Product</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
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
