import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { getAllProducts, getUserProducts } from "../services/products";
import { useCallback } from "react";
import colors from "../config/colors";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = (width - 30) / 2; // Calculate the card width based on screen width
const NAVIGATION_BAR_HEIGHT = 50; // Adjust this value based on your navigation bar's height

const Card = ({ userId }) => {
  const [productListing, setProductListing] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Data for the cards
  const data = [
    {
      productId: 7,
      image: require("../../assets/card1.png"),
    },
    {
      productId: 8,
      image: require("../../assets/card2.png"),
    },
    {
      productId: 9,
      image: require("../../assets/card3.png"),
    },
  ];

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await getAllProducts();
  //       console.log(response.data);
  //       setProductListing(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchProducts(); // Call the fetchProducts function when the component mounts
  // }, []);
  const fetchUsersProducts = useCallback(async () => {
    try {
      const response = await getUserProducts(userId);
      console.log(response.data);
      setProductListing(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUsersProducts();
  }, [fetchUsersProducts]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await getAllProducts();
      console.log(response.data);
      setProductListing(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCardPress = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const renderItem = ({ productListing, item }) => {
    const imageData = data.find((dataItem) => dataItem.id === item.id); // Find the image data corresponding to the current item
    console.log("item:", item);
    console.log("imageData:", imageData);
    return (
      <View style={[styles.card, { width: CARD_WIDTH }]}>
        <TouchableOpacity onPress={() => handleCardPress(productListing)}>
          <Image
            source={imageData.image}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{productListing.modelName}</Text>
            <Text style={styles.description}>{productListing.description}</Text>
            <Text style={styles.price}>
              Rs.{productListing.price.toLocaleString()}
            </Text>
            {/* <Text style={styles.price}>{productListing.quantity}</Text> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productListing}
        renderItem={({ item }) => renderItem({ productListing: item, item })}
        numColumns={2} // Set the number of columns to 2 for the grid layout
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedProduct?.modelName}</Text>
            <Text>{selectedProduct?.description}</Text>
            <Text>Price: Rs.{selectedProduct?.price.toLocaleString()}</Text>
            {/* Add more product details here */}
            <Button title="Close" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 30,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noProductsText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    marginTop: 20,
  },
});

export default Card;
