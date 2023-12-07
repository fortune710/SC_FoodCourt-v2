import React from "react"
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Styles from "../constants/Styles";

const Categories = [
    'Rice',
    'Sharwama',
    'Pasta',
    'Grills',
    'Wraps'
]


const CategoriesList: React.FC = () => {
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
                    <Pressable style={styles.horizontalListItem}>
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