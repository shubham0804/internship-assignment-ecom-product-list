import React from "react";
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from "react-native";
import { COLORS } from "../assets/theme";

const windowWidth = Dimensions.get("window").width;

const Products = ({ product }) => {
    const discountDisplayLabel = product.discountDisplayLabel.replace(/[{()}]/g, "");
    return (
        <Pressable
            style={styles.container}
            android_ripple={{
                color: COLORS.lightPrimary,
            }}
        >
            {/* Image */}
            <Image
                source={{ uri: product.searchImage }}
                style={[styles.image]}
                resizeMode="contain"
            />
            {/* Product Details */}
            <View style={styles.productDetails}>
                {/* Brand Name */}
                <Text style={styles.brand}>{product.brand}</Text>
                {/* Additional Info */}
                <Text style={styles.additionalInfo}>{product.additionalInfo}</Text>
                {/* Price */}
                <View style={{ flexDirection: "row" }}>
                    {/* Price */}
                    <Text style={styles.price}>₹{product.price}</Text>
                    {/* MRP */}
                    <Text style={styles.mrp}>₹{product.mrp}</Text>
                    {/* Discount Percentage */}
                    {!!discountDisplayLabel && (
                        <Text style={styles.discountDisplayLabel}>{discountDisplayLabel}</Text>
                    )}
                </View>
            </View>
        </Pressable>
    );
};

export default Products;

const styles = StyleSheet.create({
    additionalInfo: {
        color: "grey",
        fontSize: 12,
    },
    brand: {
        fontSize: 15,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
    },
    discountDisplayLabel: {
        fontSize: 13,
        fontWeight: "bold",
        color: COLORS.primary,
    },
    image: {
        width: windowWidth / 2,
        aspectRatio: 0.75,
    },
    price: {
        fontWeight: "bold",
    },
    productDetails: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 10,
        paddingLeft: 13,
        paddingTop: 5,
        paddingBottom: 10,
    },
    mrp: {
        fontSize: 13,
        color: "grey",
        marginHorizontal: 5,
        textDecorationLine: "line-through",
    },
});
