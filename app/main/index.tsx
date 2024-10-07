import React from "react"
import { ScrollView, StyleSheet, Pressable, View, ActivityIndicator } from "react-native";
import { Page, Text } from "../../components/Themed";
import Searchbar from "../../components/Searchbar";
import CategoriesList from "../../components/CategoriesList";
import { useState } from "react";
import useRestaurant from "@/hooks/useRestaurant";
import HomeSearch from "@/components/HomeSearch";
import RestaurantsList from "@/components/Restaurants/RestaurantsList";
import RecentOrdersList from "@/components/RecentOrders/RecentOrdersList";

const Recents = [
    {
        name: "Mexican Sharwama",
        restaurant: "W Sauce",
        status: 4
    },
    {
        name: "Mexican Sharwama",
        restaurant: "W Sauce",
        status: 4
    },
    {
        name: "Mexican Sharwama",
        restaurant: "W Sauce",
        status: 4
    },
    {
        name: "Mexican Sharwama",
        restaurant: "W Sauce",
        status: 4
    },
    {
        name: "Mexican Sharwama",
        restaurant: "W Sauce",
        status: 4
    },
    {
        name: "Mexican Sharwama",
        restaurant: "W Sauce",
        status: 4
    },
]




export default function HomePage() {
    const [isSearchActive, setIsSearchActive] = useState(false);


    const { isLoading, data: restaurant } = useRestaurant();

    if(isSearchActive) {
        return (
            <Page style={styles.pagePadding}>
                <HomeSearch setIsSearchActive={setIsSearchActive} />
            </Page>
        )
    }

    return (
        <Page style={styles.pagePadding}>
            <ScrollView contentInset={{ bottom: 128 }} showsVerticalScrollIndicator={false}>

                <View>
                    <Text>Hi There</Text>
                    <Text style={styles.greetingText}>What will we be having today?</Text>
                </View>

                <Pressable onPress={() => setIsSearchActive(true)}>
                    <Searchbar disable={false}/>
                </Pressable>

                <CategoriesList/>

                <View>
                    <Text style={styles.recentsText}>Recents</Text>
                    <RecentOrdersList recentOrders={Recents} />
                </View>

                <View>
                    <Text style={styles.vendorText}>Vendor</Text>
                    {
                        isLoading ? <ActivityIndicator/> :
                        <RestaurantsList restaurants={restaurant!}/>
                    }
                </View>

            </ScrollView>

        </Page>
    )
}


const styles = StyleSheet.create({
    recentsText: { fontWeight: "900", marginVertical: 16, fontSize: 20 },
    greetingText: { fontWeight: "900", marginVertical: 16, fontSize: 20 },
    vendorText: { fontWeight: "900", marginVertical: 16, fontSize: 20 },
    pagePadding: { paddingHorizontal: 16 }
})