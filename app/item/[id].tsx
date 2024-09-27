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
import useSingleRestaurant from "@/hooks/useSingleResturant";
import { Button, ListItem } from "@rneui/themed";
import useCart from "@/hooks/useCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Clock } from "lucide-react-native";

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
    const { id, resturantId } = useLocalSearchParams();

    const { getSingleMenuItem,menuItems } = useSingleRestaurant(Number(resturantId));
    const menuItem = getSingleMenuItem(Number(id));
    const [quantity, setQuantity] = useState(1);
    const { currentUser } = useCurrentUser();
    const [expanded, setExpanded] = useState(false);

    const { addItem } = useCart(currentUser?.id!);
    console.log(menuItem)





    return (
        <Page>
            <ScrollView>
                <Header pageTitle={menuItem?.name || ""}/>
                <View style={{ position: "relative", height: 150, width: "100%" }}>
                    <ImageBackground source={require("../../assets/images/food.png")} style={[Styles.ImageBackground]}/>
                </View>

                <View className="flex flex-row justify-between w-full">
                    <View>
                        <Text>{menuItem?.name}</Text>
                        <Text>Category: {menuItem?.category}</Text>
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

                <View>
                    <Clock/>
                    <Text>{menuItem?.preparation_time!}</Text>
                </View>

                
                <ListItem.Accordion
                    content={
                        <ListItem.Content>
                            <ListItem.Title>Add Ons</ListItem.Title>
                        </ListItem.Content>
                    }
                    isExpanded={expanded}
                    onPress={() => {
                        setExpanded(!expanded);
                    }}
                    >
                        {
                            menuItem?.add_ons?.map((item) => (
                                <ListItem key={item.foodName} bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title>{item.foodName}</ListItem.Title>
                                        <ListItem.Subtitle>{item.price}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>

                            ))
                        }
                </ListItem.Accordion>


                <Button 
                    onPress={() => addItem({
                        user_id: currentUser?.id!,
                        menu_item_id: menuItem?.id!,
                        quantity: quantity,
                    })} 
                    color="#F72F2F" 
                    style={{ alignSelf: "center", width: "100%" }} 
                    titleStyle={{ textAlign: "center", padding: 32 }}
                >
                    <Text>Add to Cart (N {(menuItem?.price || 0) * quantity})</Text>    
                </Button>




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