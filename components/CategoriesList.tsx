import React, { useState } from "react"
import { View, FlatList, Pressable, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import {Link, router, useRouter} from "expo-router";
import Styles from "../constants/Styles";
import { X } from "lucide-react-native";
import { Category } from "@/types";
import { CATEGORIES } from "@/utils/constants";
import { verticalScale, scale } from 'react-native-size-matters'



interface CategoriesListProps {
    onChange?: (category: string|"all") => void,
    filteredCategories?: Category[],
    restaurantId?: number
    style?: object
}

const CategoriesList: React.FC<CategoriesListProps> = ({ onChange, filteredCategories, restaurantId, style }) => {
    const data = filteredCategories ? filteredCategories : CATEGORIES;

    const handleChange = (category: string) => {
        return onChange && onChange(category)
    }

    return (
        <View style={[Styles.DefaultSpaceY, style, {gap: 16}]}>
            <Text style={{ fontWeight: "900", fontSize: 24, paddingHorizontal: 16 }}>
                Categories
            </Text>
            <FlatList
                horizontal
                data={data}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: category }) => (
                    <Link 
                        href={{
                            pathname: '/category/[id]',
                            params: { id: category.name, vendor: restaurantId }
                        }} 
                        asChild
                    >
                        <TouchableOpacity onPress={() => handleChange(category.name)} style={styles.horizontalListItem}>
                            <View style={styles.itemContainer}>
                                <Image style={{ width: 32, height: 32 }} source={category.image}/>
                            </View>
                            <Text>{category.name}</Text>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    containerPadding: {
        paddingLeft: 12
    },
    horizontalListItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: 4,
        left: 8
    },
    itemContainer: {
        borderWidth: 1, 
        borderRadius: 54/2,
        borderColor: "red",
        marginBottom: verticalScale(8),
        marginHorizontal: scale(12),
        width: 54,
        height: 54,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    vendorCard: {
        backgroundColor: "red",
        marginRight: 0,
        height: 100,
        borderRadius: 12,
        marginVertical: 7,
        justifyContent: "center",
        position: "relative"
    }
})

export default CategoriesList;