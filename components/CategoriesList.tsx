import React, { useState } from "react"
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Styles from "../constants/Styles";
import { X } from "lucide-react-native";

export const CATEGORIES = [
    {
        name: "Rice",
        image: require("../assets/images/rice-bowl.svg")
    },
    {
        name: "Pasta",
        image: require("../assets/images/pasta.svg")
    },
    {
        name: "Sharwama",
        image: require("../assets/images/sharwama.svg")
    },
    {
        name: "Drinks",
        image: require("../assets/images/rice-bowl.svg")
    },
    {
        name: "Desserts",
        image: require("../assets/images/rice-bowl.svg")
    },
    {
        name: "Grills",
        image: require("../assets/images/grills.svg")
    },
    {
        name: "Sandwiches",
        image: require("../assets/images/rice-bowl.svg")
    },
    {
        name: "Burgers",
        image: require("../assets/images/burger.svg")
    }
] as const

type Category = typeof CATEGORIES[number]['name'];

interface CategoriesListProps {
    onChange?: (category: Category|"all") => void
}

const CategoriesList: React.FC<CategoriesListProps> = ({ onChange }) => {
    const [_, setCategory] = useState<Category>();

    const handleChange = (category: Category) => {
        if (category === _) {
            setCategory(undefined);
            onChange && onChange("all");
            return
        }
        setCategory(category);
        onChange && onChange(category)
    }

    return (
        <View style={Styles.DefaultSpaceY}>
            <Text style={{ marginBottom: 8, fontWeight: "900", fontSize: 20 }}>
                Categories
            </Text>
            <FlatList
                horizontal
                data={CATEGORIES}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: category }) => (
                    <Pressable onPress={() => handleChange(category.name)} style={styles.horizontalListItem}>
                        <View style={styles.itemContainer}>
                            {
                                category.name === _ ? <X /> :
                                <Image style={{ width: 50, height: 50 }} source={category.image} />
                            }
                        </View>
                        <Text>{category.name}</Text>
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