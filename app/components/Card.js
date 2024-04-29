import React from "react";
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");
const CARD_WIDTH = (width - 30) / 2; // Calculate the card width based on screen width
const NAVIGATION_BAR_HEIGHT = 50; // Adjust this value based on your navigation bar's height


const Card = () => {
  // Data for the cards
  const data = [
    { id: 1, title: "iPhone 15", description: "Karachi - used", price: "PKR 140,000", image: require("../../assets/card1.png") },
    { id: 2, title: "iPhone 15", description: "Karachi - used", price: "PKR 140,000", image: require("../../assets/card2.png") },
    { id: 3, title: "iPhone 15", description: "Karachi - used", price: "PKR 140,000", image: require("../../assets/card3.png") }
  ];

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      <Image
        source={item.image}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
      numColumns={2} // Set the number of columns to 2 for the grid layout
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingBottom: NAVIGATION_BAR_HEIGHT, // Add padding to the bottom to accommodate the navigation bar

  },
  card: {
    flex: 0.5, // Ensure equal flex for each card to maintain grid layout
    backgroundColor: "#ffffff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOpacity: 0.3, // for shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // for shadow on iOS
    shadowRadius: 3, // for shadow on iOS
    marginHorizontal: 5, // Add margin for spacing between cards
  },
  image: {
    width: "100%",
    height: 100,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Card;
