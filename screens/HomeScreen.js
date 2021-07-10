import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, StyleSheet, FlatList, Modal, Pressable } from "react-native";
import { COLORS } from "../assets/theme";
import Product from "../components/Product";
import FilterScreen from "./FilterScreen";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
    const [apiData, setApiData] = useState([]);
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setModalVisibility] = useState(false);

    const getData = async () => {
        try {
            const url = `https://demo7242716.mockable.io/products`;
            const response = await fetch(url);
            const { products } = await response.json();
            if (products && typeof products === "object") {
                setApiData(products);
                setData(products);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Get Initial Product List from api
    useEffect(() => {
        getData();
    }, []);

    // Re-render product list acc. to filters
    useEffect(() => {
        const oldData = apiData;
        let newData = [];
        if (Object.keys(filters).length > 0) {
            for (const [category, categoryData] of Object.entries(filters)) {
                const test = oldData.filter((product) => categoryData.includes(product[category]));
                // Add if not present
                for (const testData of test) {
                    !newData.includes(testData) && newData.push(testData);
                }
            }
            setData(newData);
        } else {
            setData(apiData);
        }
    }, [isModalVisible]);

    return (
        <>
            <StatusBar translucent backgroundColor={COLORS.secondary} />
            {!isLoading && data.length >= 0 && (
                <View style={styles.container}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <Product product={item} />}
                        keyExtractor={(_, index) => index.toString()}
                        numColumns={2}
                        columnWrapperStyle={{ marginHorizontal: 2 }}
                        showsVerticalScrollIndicator={false}
                    />
                    {/* Filter Button */}
                    <View>
                        <Pressable
                            style={styles.filterButton}
                            onPress={() => setModalVisibility(true)}
                            android_ripple={{
                                color: "white",
                                radius: 28,
                            }}
                        >
                            <MaterialCommunityIcons name="filter" color="white" size={25} />
                        </Pressable>
                        {Object.keys(filters).length > 0 && <View style={styles.filterIndicator} />}
                    </View>
                    {/* Filter Modal */}
                    <Modal
                        visible={isModalVisible}
                        onRequestClose={() => setModalVisibility(false)}
                    >
                        <FilterScreen
                            filters={filters}
                            setFilters={setFilters}
                            setModalVisibility={setModalVisibility}
                        />
                    </Modal>
                </View>
            )}

            {isLoading && (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
    },
    filterButton: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 10,
        right: 15,
        backgroundColor: COLORS.primary,
        height: 55,
        width: 55,
        borderRadius: 28,
    },
    filterIcon: {
        color: "red",
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
    filterIndicator: {
        position: "absolute",
        bottom: 57,
        right: 10,
        backgroundColor: COLORS.secondary,
        width: 12,
        height: 12,
        borderRadius: 6,
    },
});

export default HomeScreen;
