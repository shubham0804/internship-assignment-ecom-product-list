import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { filters as filterData } from "../assets/data";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../assets/theme";

const FilterScreen = ({ filters, setFilters, setModalVisibility }) => {
    const [selectedFilterCategory, setSelectedFilterCategory] = useState(filterData[0].key);
    const [dummyState, setDummyState] = useState(0);

    const CategoryData = ({ data, category }) => {
        let isSelected;
        if (filters[category] && filters[category].includes(data)) {
            isSelected = true;
        } else {
            isSelected = false;
        }
        return (
            <Pressable
                style={styles.categoryDataContainer}
                onPress={() => {
                    let newFilters = filters;
                    setDummyState(dummyState + 1);
                    let categoryFound = false;
                    for (const [key, value] of Object.entries(newFilters)) {
                        if (key === category) {
                            // Check if filter value is already present
                            if (newFilters[category].includes(data)) {
                                // Remove it
                                const index = newFilters[category].indexOf(data);
                                newFilters[category].splice(index, 1);
                                // Delete Category if values not present
                                newFilters[category].length === 0 && delete newFilters[category];
                            } else {
                                // Add it
                                newFilters[category].push(data);
                            }
                            categoryFound = true;
                        }
                    }
                    if (!categoryFound) {
                        newFilters[category] = [data];
                    }
                    setFilters(newFilters);
                    // console.log(filters);
                }}
            >
                {/* Selection */}
                <MaterialCommunityIcons
                    name="check"
                    color={isSelected ? "#1e90ff" : "#d3d3d3"}
                    size={23}
                />
                {/* Text */}
                <Text
                    style={
                        !isSelected
                            ? styles.categoryDataText
                            : [styles.categoryDataText, { fontWeight: "bold" }]
                    }
                >
                    {data}
                </Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            {/* Heading & Clear all Button */}
            <View style={styles.headingContainer}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Filters</Text>
                <Pressable
                    onPress={() => setFilters({})}
                    android_ripple={{
                        color: COLORS.lightGrey,
                    }}
                >
                    <Text style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 16 }}>
                        CLEAR ALL
                    </Text>
                </Pressable>
            </View>
            {/* Separator */}
            <View style={styles.separator} />
            {/* Filters */}
            <View style={{ fex: 1, flexDirection: "row" }}>
                {/* Filter Category */}
                <View style={styles.categoryContainer}>
                    {filterData.map((filter) => (
                        <Pressable
                            key={filter.key}
                            style={
                                selectedFilterCategory !== filter.key
                                    ? styles.filterCategoryButton
                                    : [styles.filterCategoryButton, { backgroundColor: "white" }]
                            }
                            onPress={() => setSelectedFilterCategory(filter.key)}
                        >
                            <Text
                                style={
                                    selectedFilterCategory !== filter.key
                                        ? styles.filterCategoryText
                                        : [styles.filterCategoryText, { fontWeight: "bold" }]
                                }
                            >
                                {filter.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>
                {/* Filter Data */}
                <View style={styles.dataContainer}>
                    <FlatList
                        data={filterData[selectedFilterCategory].values}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <CategoryData
                                data={item}
                                category={filterData[selectedFilterCategory].category}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
            {/* Apply Button */}
            <Pressable
                style={styles.applyButton}
                onPress={() => setModalVisibility(false)}
                android_ripple={{
                    color: "white",
                    // radius: 28,
                }}
            >
                <Text style={styles.applyText}>APPLY</Text>
            </Pressable>
        </View>
    );
};

export default FilterScreen;

const styles = StyleSheet.create({
    applyButton: {
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 20,
        marginBottom: 10,
        borderRadius: 15,
        width: 100,
        height: 50,
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    applyText: {
        fontSize: 18,
        color: "white",
    },
    categoryContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: 10,
    },
    categoryDataText: {
        fontSize: 17,
        paddingLeft: 20,
    },
    categoryDataContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 45,
        marginLeft: 20,
    },
    dataContainer: {
        flex: 2,
    },
    filterCategoryButton: {
        backgroundColor: "#F5F5F5",
        borderColor: "grey",
        borderBottomWidth: 0.3,
        height: 45,
        justifyContent: "center",
        paddingLeft: 15,
    },
    filterCategoryText: {
        fontSize: 16,
    },
    headingContainer: {
        marginHorizontal: 20,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    separator: {
        width: "100%",
        borderBottomColor: "#d3d3d3",
        borderBottomWidth: 0.5,
        marginVertical: 10,
    },
});
