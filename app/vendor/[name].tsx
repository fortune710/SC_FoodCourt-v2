import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Page, Text } from "../../components/Themed";
import useThemeColor from "../../hooks/useThemeColor";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ImageBackground } from "expo-image";
import Styles from "../../constants/Styles";
import Searchbar from "../../components/Searchbar";
import CategoriesList from "../../components/CategoriesList";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

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

    const router = useRouter()

    const priceTagColor = {
        color: primaryColor,
        borderColor: primaryColor,
        // backgroundColor: primaryColor + "50"
    }

    return (
        <SafeAreaView>
            <Page>
            <ScrollView>
                {/* <Header pageTitle="Vendor"/> */}
                <View style={{ position: "relative", width: "100%" }}>
                    <Pressable
                        onPress={() => router.back()}
                        style={{marginTop: 16, marginLeft: 10}}
                    >
                        <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', }}>
                        <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
                        <Text style={{fontSize:15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
                        </View>
                    </Pressable>
                    <Text style={{ color: "#fff", marginVertical: 16, marginHorizontal: 16, fontSize: 20, fontWeight: "700" }}>{name}</Text>
                    <ImageBackground source={require("../../assets/images/food.png")} style={[Styles.ImageBackground]}/>

                    <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
                    <Searchbar/>
                    </View>
                </View>

                <View style={{ marginHorizontal: 16 }}>
                <CategoriesList/>
                </View>

                <View style={[Styles.DefaultPaddingX, Styles.DefaultSpaceY, { marginHorizontal: 16 }]}>

                    <View>
                        <Text>Sharwama</Text>
                        {
                            Dishes.map((dish, index) => (
                                <Pressable 
                                    key={index} 
                                    style={styles.listItem}
                                    onPress={() => router.push(`/item/${dish.name}`)}
                                >
                                    <View style={{ width: "70%" }}>
                                        <Text>{dish.name}</Text>
                                        <Text>{dish.description}</Text>
                                    </View>
                                    <Text style={[styles.priceTag, priceTagColor]}>N {dish.price}</Text>
                                </Pressable>
                            ))
                        }
                    </View>
                </View>

            </ScrollView>
        </Page>
        </SafeAreaView>
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