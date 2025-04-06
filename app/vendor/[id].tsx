import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { PageScroll, Text } from "../../components/Themed";
import useThemeColor from "../../hooks/useThemeColor";
import { Link, useLocalSearchParams, useRouter, router } from "expo-router";
import { Image, ImageBackground } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Styles from "../../constants/Styles";
import Searchbar from "../../components/Searchbar";
import CategoriesList from "../../components/CategoriesList";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import useSingleRestaurant from "@/hooks/useSingleResturant";
import { scale } from "react-native-size-matters";
import { useState, useMemo } from "react";

export default function VendorDetailPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const primaryColor = useThemeColor({}, "primary");
    const { id, category } = useLocalSearchParams();
    const { restaurant, isLoading, menuItemsSorted } = useSingleRestaurant(Number(id));
    const availableCategories = Object.keys(menuItemsSorted ?? {});

    const router = useRouter();

    const priceTagColor = {
        color: primaryColor,
        borderColor: primaryColor,
        // backgroundColor: primaryColor + "50"
    }

    // Filter menu items based on search query
    const filteredMenuItems = useMemo(() => {
        if (!menuItemsSorted) return {};

        const filtered: Record<string, typeof menuItemsSorted[string]> = {};
        if (searchQuery.trim()) {
            Object.keys(menuItemsSorted).forEach(category => {
                const matchingItems = menuItemsSorted[category].filter(item =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                if (matchingItems.length > 0) {
                    filtered[category] = matchingItems;
                }
            });
        } else {
            return menuItemsSorted;
        }
        return filtered;
    }, [menuItemsSorted, searchQuery]);

    return (
        <PageScroll>
            <View className="flex flex-row justify-between my-4 bg-white" style={{ paddingHorizontal: 8 }}>
                <Pressable onPress={() => router.back()}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
                        <Text style={{ fontSize: 15, textAlign: 'center', color: '#f72f2f' }}>Back</Text>
                    </View>
                </Pressable>

                <Link href="/cart/shopping-cart-full" asChild>
                    <MaterialCommunityIcons size={25} name="cart" color={primaryColor} />
                </Link>
            </View>

            <View style={{ position: "relative", width: "100%", height: 160 }}>
                <ImageBackground
                    source={
                        restaurant?.image_url ?
                            { uri: restaurant?.image_url }
                            :
                            require("../../assets/images/food.png")
                    }
                    style={[
                        Styles.ImageBackground,
                        {
                            paddingHorizontal: 16,
                            paddingTop: 8,
                            paddingBottom: 16
                        }
                    ]}
                >
                    <View style={{ height: '100%', justifyContent: 'space-between' }}>
                        <Text style={{ color: "#fff", marginVertical: 16, fontSize: 24, fontWeight: "600" }}>{restaurant?.name}</Text>

                        <View style={{ alignItems: 'flex-end' }}>
                            <Searchbar
                                showIcon
                                width={'80%'}
                                color={'#fff'}
                                query={searchQuery}
                                setQuery={setSearchQuery}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <View style={{ marginHorizontal: 16 }}>
                <Text style={styles.subtitle}>Select item, then add to cart</Text>
            </View>

            <CategoriesList restaurantId={restaurant?.id} onChange={(category) => router.setParams({ category, vendor: restaurant?.id })} />

            <View style={[Styles.DefaultSpaceY]}>
                {
                    isLoading ? <ActivityIndicator /> :
                        !category || category == "all" ?
                            availableCategories.length === 0 ?
                                <View className="px-3 py-16 flex flex-col items-center text-center gap-3">
                                    <Text className="text-center">There are no menu items avialable for this vendor.</Text>
                                    <Text>Please check back again soon.</Text>
                                </View>
                                :
                                availableCategories.map((category, index) => (
                                    <View key={category}>
                                        <View style={{ paddingTop: 4, paddingBottom: 24, paddingHorizontal: 16 }}>
                                            <Text style={[priceTagColor, { fontWeight: "700", fontSize: 20 }]}>{category}</Text>
                                        </View>
                                        {
                                            filteredMenuItems[category]?.map((dish, index) => (
                                                <Pressable
                                                    key={index}
                                                    className="border-b border-gray-200 w-full gap-2"
                                                    style={styles.listItem}
                                                    onPress={() => router.push({
                                                        pathname: "/item/[id]",
                                                        params: {
                                                            id: dish.id,
                                                            restaurantId: restaurant?.id
                                                        }
                                                    })}
                                                >
                                                    <View style={{ width: "70%" }}>
                                                        <Text style={{ fontWeight: 600, fontSize: 16 }}>{dish.name}</Text>
                                                    </View>
                                                    <View style={[styles.priceTag, priceTagColor,]}>
                                                        <Text style={[priceTagColor, { fontWeight: 600, fontSize: 16 }]}>
                                                            ₦ {new Intl.NumberFormat('en-US').format(dish.price)}</Text>
                                                    </View>
                                                </Pressable>
                                            ))
                                        }
                                    </View>
                                ))
                            :
                            <View>
                                <Text style={[priceTagColor, { fontWeight: "700" }]}>{category}</Text>
                                {
                                    menuItemsSorted![category as string]?.map((dish, index) => (
                                        <Pressable
                                            key={index}
                                            style={styles.listItem}
                                            onPress={() => router.push({
                                                pathname: "/item/[id]",
                                                params: {
                                                    id: dish.id,
                                                    resturantId: restaurant?.id
                                                }
                                            })}
                                        >
                                            <View style={{ width: "70%" }}>
                                                <Text style={{ fontWeight: 600, fontSize: 16 }}>{dish.name}</Text>
                                            </View>
                                            <Text style={[styles.priceTag, priceTagColor]}>
                                                ₦ {new Intl.NumberFormat('en-US').format(dish.price)}
                                            </Text>
                                        </Pressable>
                                    ))
                                }
                            </View>
                }
            </View>
        </PageScroll>
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
        flexDirection: "row",
        justifyContent: "space-between",
        height: 54,
        paddingHorizontal: 16,
        marginBottom: 16
    },
    priceTag: {
        height: '60%',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: "#F72F2F4C"
    },
    subtitle: {
        textAlign: 'right',
        marginBottom: 4
    },

})