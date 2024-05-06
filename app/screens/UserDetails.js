import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import colors from "../config/colors";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { getDetails } from "../services";
import { useCallback } from "react";

const UserDetails = ({ navigation }) => {
  const [userData, setUserData] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await getDetails();
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.container}>
        <Text
          style={[
            styles.text,
            {
              fontSize: 30,
            },
          ]}
        >
          {userData.name}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={[styles.text, { fontSize: 15 }]}>
            View Profile
            <Ionicons
              name="chevron-forward"
              size={15}
              color={colors.white}
              style={styles.arrowIcon}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    width: "100%",
    height: "30%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    color: colors.white,
    left: "10%",
    ...Platform.select({
      ios: {
        top: 100,
      },
      android: {
        padding: 20,
        top: 130,
      },
    }),
  },
  arrowIcon: {
    alignItems: "center",
  },
});
