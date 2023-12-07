import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Page, Text } from "../../components/Themed";
import useThemeColor from "../../hooks/useThemeColor";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ImageBackground } from "expo-image";
import Styles from "../../constants/Styles";
import Searchbar from "../../components/Searchbar";
import CategoriesList from "../../components/CategoriesList";
import Header from "../../components/Header";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Dishes = [
    {
        name: "Mexican Sharwama 1",
        price: 1500,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        name: "Mexican Sharwama 2",
        price: 1100,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        name: "Mexican Sharwama 3",
        price: 1600,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },   
]

export default function VendorDetailPage() {

    const primaryColor = useThemeColor({}, "primary");
    const { name } = useLocalSearchParams();

    const dishToUse = Dishes.find((dish) => dish.name === name)

    const router = useRouter()

    const priceTagColor = {
        color: primaryColor,
        borderColor: primaryColor,
        backgroundColor: primaryColor + "50"
    }

    const [quantity, setQuantity] = useState(1)

    return (
        <Page>
            <ScrollView>
                <Header pageTitle={dishToUse?.name || ""}/>
                <View style={{ position: "relative", height: 150, width: "100%" }}>
                    <ImageBackground source={require("../../assets/images/food.png")} style={[Styles.ImageBackground]}/>
                </View>

                <View>
                    <View>
                        <Text>{dishToUse?.name}</Text>
                        <Text>{dishToUse?.description}</Text>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", width: 300, justifyContent: "space-around" }}>
                        <Pressable onPress={() => setQuantity(quantity + 1)}>
                            <FontAwesome name="plus"/>
                        </Pressable>
                        <Text>{quantity}</Text>
                        <Pressable onPress={() => setQuantity((prev) => prev--)}>
                            <FontAwesome name="minus"/>
                        </Pressable>
                    </View>
                </View>



            </ScrollView>
        </Page>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        height: 70
    },
    listItem: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 90
    },
    priceTag: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 20
    }
})