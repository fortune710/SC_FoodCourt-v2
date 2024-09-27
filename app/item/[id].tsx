import { Pressable, ScrollView, View } from "react-native";
import { Page, Text } from "../../components/Themed";
import useThemeColor from "../../hooks/useThemeColor";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ImageBackground } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useSingleRestaurant from "@/hooks/useSingleResturant";
import { Button, ListItem } from "@rneui/themed";
import useCart from "@/hooks/useCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Clock } from "lucide-react-native";
import { useState } from "react";

import products from "@/mock/products.json";

export default function MenuItemDetail() {
    const router = useRouter();
    const { id, resturantId } = useLocalSearchParams();
    const [expanded, setExpanded] = useState(false);


    const { getSingleMenuItem } = useSingleRestaurant(Number(resturantId));
    const menuItem = getSingleMenuItem(Number(id));
    const [quantity, setQuantity] = useState(1);
    const { currentUser } = useCurrentUser();
    const { addItem } = useCart(currentUser?.id!);


    return (
        <Page className="flex-1 bg-white">
            <View className="relative h-48">
                <ImageBackground
                    source={require("../../assets/images/food.png")}
                    className="w-full h-full"
                    resizeMode="cover"
                >
                    <View className="absolute top-0 left-0 p-4 flex-row justify-between items-center w-full">
                        <Pressable onPress={() => router.back()}>
                            <FontAwesome name="bars" size={24} color="black" />
                        </Pressable>
                        <Text className="text-black text-lg font-semibold">Mexican Shawarma</Text>
                        <FontAwesome name="shopping-cart" size={24} color="red" />
                    </View>
                </ImageBackground>
            </View>

            <ScrollView className="p-4 space-y-4">
                <Text className="text-xl font-semibold">{menuItem?.name}</Text>
                <Text className="text-gray-500">{menuItem?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</Text>
                
                <View className="flex-row items-center space-x-4">
                    <Pressable onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="p-2 bg-gray-200 rounded-full">
                        <FontAwesome name="minus" size={16} color="black" />
                    </Pressable>
                    <Text className="text-lg">{quantity}</Text>
                    <Pressable onPress={() => setQuantity(quantity + 1)} className="p-2 bg-gray-200 rounded-full">
                        <FontAwesome name="plus" size={16} color="black" />
                    </Pressable>
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
    );
}
