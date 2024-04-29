import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import colors from "../config/colors";

const UserDetails = ({navigation}) => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={[styles.text, { top: 150 }]}>Haris Khalid</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text style={[styles.text, { top: 150, fontSize: 20 }]}>
          View Profile
          <Ionicons name="chevron-forward" size={20} color={colors.white} style={styles.arrowIcon} />
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    width: "100%",
    height: "30%",
    borderRadius: 35,
  },
  text: {
    fontSize: 30,
    color: colors.white,
    left: 20,
  },
  arrowIcon:{
    alignItems:"center"
  }
});
