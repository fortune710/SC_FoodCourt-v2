import { ScrollView, View as DefaultView, StyleSheet, FlatList, Pressable } from "react-native";
import { Page, Text } from "../../components/Themed";
import { SearchBar } from "react-native-screens";
import { TextInput } from "react-native";


import { Image, ImageBackground } from "expo-image"

import FontAwesome from "@expo/vector-icons/FontAwesome";
import useThemeColor from "../../hooks/useThemeColor";
import Styles from "../../constants/Styles";
import { Link, useRouter } from "expo-router";
import Searchbar from "../../components/Searchbar";
import CategoriesList from "../../components/CategoriesList";

const Vendors = [
    { name: "W Sauce" },
    { name: "Suya Craze" },
    { name: "African Kitchen" },
    { name: "W Sauce" },
]


const Recents = [
    {
        name: "Mexican Sharwama",
        resturant: "W Sauce",
        status: "preparing"
    },
    {
        name: "Mexican Sharwama",
        resturant: "W Sauce",
        status: "preparing"
    },
    {
        name: "Mexican Sharwama",
        resturant: "W Sauce",
        status: "preparing"
    },
    {
        name: "Mexican Sharwama",
        resturant: "W Sauce",
        status: "preparing"
    },
    {
        name: "Mexican Sharwama",
        resturant: "W Sauce",
        status: "preparing"
    },
    {
        name: "Mexican Sharwama",
        resturant: "W Sauce",
        status: "preparing"
    },
]

export default function HomePage() {
    const router = useRouter()

    return (
        <Page>
            <ScrollView>

                <Text>Hello There</Text>

                <DefaultView>
                    <Text>Hi, Ada Tobi Musa</Text>
                    <Text>What will we be having today?</Text>
                </DefaultView>

                <Searchbar/>

                <CategoriesList/>

                <DefaultView>
                    <Text>Recents</Text>
                    <FlatList
                        horizontal
                        data={Recents}
                        renderItem={({ item: { name, resturant, status } }) => (
                            <Pressable style={styles.horizontalListItem}>
                                <Text>{name}</Text>
                                <Text>{resturant}</Text>

                                <Text style={{ backgroundColor: "#FFD686", color: "#fff" }}>
                                    {status}
                                </Text>
                            </Pressable>
                        )}
                    />
                </DefaultView>

                <DefaultView style={Styles.DefaultPaddingX}>
                    <Text>Vendor</Text>
                    {
                        Vendors.map(({ name }, index) => (
                            <Pressable onPress={() => router.push(`/vendor/${name.replaceAll(" ", "-")}`)} key={`${name}-${index}`} style={[styles.horizontalListItem, styles.vendorCard]}>
                                <Image style={{ width: "100%", height: "100%", position: "absolute", zIndex: -10, borderRadius: 12 }} source={require("../../assets/images/food.png")}/>
                                <Text style={{ color: "#fff" }}>{name}</Text>
                            </Pressable>
                        ))
                    }
                </DefaultView>

            </ScrollView>

        </Page>
    )
}


const styles = StyleSheet.create({
    searchbar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 1,
        height: 44,
        paddingHorizontal: 10,
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