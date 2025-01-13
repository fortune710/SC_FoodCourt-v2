import React from "react"
import { ScrollView, StyleSheet, Pressable, View, ActivityIndicator } from "react-native";
import { Page, PageScroll, Text } from "../../components/Themed";
import Searchbar from "../../components/Searchbar";
import CategoriesList from "../../components/CategoriesList";
import { useState } from "react";
import useRestaurant from "@/hooks/useRestaurant";
import HomeSearch from "@/components/HomeSearch";
import RestaurantsList from "@/components/Restaurants/RestaurantsList";
import RecentOrdersList from "@/components/RecentOrders/RecentOrdersList";
import useOrders from "@/hooks/useOrders";
import Styles from "@/constants/Styles";
import useCurrentUser from "@/hooks/useCurrentUser";
import {scale, verticalScale} from 'react-native-size-matters'


export default function HomePage() {
    const [isSearchActive, setIsSearchActive] = useState(false);


    const { isLoading, data: restaurant } = useRestaurant();
    const { currentUser } = useCurrentUser();
    const { getRecentOrders } = useOrders();
    const recentOrders = getRecentOrders();

    if(isSearchActive) {
        return (
            <Page style={{paddingVertical: 16}}>
                <HomeSearch setIsSearchActive={setIsSearchActive} />
            </Page>
        )
    }

    return (
        <PageScroll>
            <View style={[styles.pagePadding, {paddingTop: 24}]}>
                <Text style={{fontSize: 20, fontFamily: "Montserrat", fontWeight: 400}}>
                    Hi, {currentUser?.full_name! || "User's Name"}
                </Text>
                <Text style={styles.greetingText}>What will we be having today?</Text>
            </View>

            <Pressable onPress={() => setIsSearchActive(true)} style={Styles.DefaultPaddingX}>
                <Searchbar disable={false} showIcon/>
            </Pressable>

            <CategoriesList/>

            <View style={[Styles.DefaultSpaceY]}>
                <Text style={styles.recentsText}>Recents</Text>
                <RecentOrdersList recentOrders={recentOrders!} />
            </View>

            <View style={Styles.DefaultPaddingX}>
                <Text style={styles.vendorText}>Vendor</Text>
                {
                    isLoading ? <ActivityIndicator/> :
                    <RestaurantsList restaurants={restaurant!}/>
                }
            </View>
        </PageScroll>
    )
}


const styles = StyleSheet.create({
    recentsText: { fontWeight: "900", marginVertical: 16, fontSize: 20, marginHorizontal: 16 },
    greetingText: { fontWeight: "700", marginTop: 8, marginBottom: 24, fontSize: 32, fontFamily: "Lato"},
    vendorText: { fontWeight: "900", marginVertical: 16, fontSize: 20 },
    pagePadding: { paddingHorizontal: 16 }
})