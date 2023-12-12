import React, { useState } from "react"
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Styles from "../constants/Styles";

const Categories = [
    'Rice',
    'Sharwama',
    'Pasta',
    'Grills',
    'Wraps'
] as const

type Category = typeof Categories[number];

interface CategoriesListProps {
    onChange?: (category: Category) => void
}

const CategoriesList: React.FC<CategoriesListProps> = ({ onChange }) => {
    const [_, setCategory] = useState<Category>();

    const handleChange = (category: Category) => {
        setCategory(category);
        onChange && onChange(category)
    }

    return (
        <View style={Styles.DefaultSpaceY}>
            <Text style={styles.containerPadding}>
                Categories
            </Text>
            <FlatList
                horizontal
                data={Categories}
                style={styles.containerPadding}                
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: category }) => (
                    <Pressable onPress={() => handleChange(category)} style={styles.horizontalListItem}>
                        <View style={styles.itemContainer}>
                            <Image style={{ width: 50, height: 50 }} source={require("../assets/images/rice-bowl.svg")} />
                        </View>
                        <Text>{category}</Text>
                    </Pressable>
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
        marginRight: 12
    },
    itemContainer: {
        borderWidth: 1, 
        borderRadius: 999,
        width: 70,
        height: 70,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
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