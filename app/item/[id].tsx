import { Pressable, ScrollView, View, Text as RnText, TouchableOpacity } from "react-native";
import { Page, Text } from "../../components/Themed";
import useThemeColor from "../../hooks/useThemeColor";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ImageBackground } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useSingleRestaurant from "@/hooks/useSingleResturant";
import useCart from "@/hooks/useCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Clock, Minus, Plus } from "lucide-react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuItemAddons from "@/components/MenuItemAddons";
import { Entypo } from "@expo/vector-icons";
import Styles from "@/constants/Styles";

export default function MenuItemDetail() {
  const router = useRouter();
  const { id, resturantId } = useLocalSearchParams();

  const { getSingleMenuItem } = useSingleRestaurant(Number(resturantId));
  const menuItem = getSingleMenuItem(Number(id));
  const [quantity, setQuantity] = useState(1);
  const { currentUser } = useCurrentUser();

  const { addItem, updateItem, getSingleCartItem } = useCart(currentUser?.id!);

  const primary = useThemeColor({}, "primary");

  const reduceQuantity = () => {
    if (quantity <= 1) return;
    return setQuantity(quantity - 1);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);

  const addItemToCart = () => {
    const existingItem = getSingleCartItem(menuItem?.id!);

    if (existingItem) {
      updateItem({id: existingItem.id, quantity: existingItem.quantity + quantity});
    } else {
      addItem({
        user_id: currentUser?.id!,
        menu_item_id: menuItem?.id!,
        quantity: quantity,
      });
    }
  };
  const totalPrice = (menuItem?.price || 0) * quantity;

  return (
    <SafeAreaView>
      <Page className="flex-1 bg-white h-screen">
        <View className="relative h-48">
          <ImageBackground
            source={require("@/assets/images/food.png")}
            style={[Styles.ImageBackground]}
          >
            <View className="absolute top-0 left-0 p-4 flex-row justify-between items-center w-full">
            <Pressable
                onPress={() => router.back()}
            >
                <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', }}>
                    <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
                    <Text style={{fontSize:15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
                </View>
            </Pressable>
            {/* <Text className="text-black text-2xl font-semibold">{menuItem?.name}</Text> */}
            {/* <FontAwesome name="shopping-cart" size={24} color="red" /> */}
            </View>
          </ImageBackground>
        </View>

        <ScrollView className="p-4 space-y-4">
          <View className="flex flex-row items-center justify-between">
            <View className="w-2/3">
              <Text className="text-xl font-semibold">{menuItem?.name}</Text>
              <Text className="text-gray-500">
                {menuItem?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity onPress={reduceQuantity} className="p-2 border border-primary rounded-full">
                <Minus stroke={primary} className="text-primary" />
              </TouchableOpacity>

              <Text className="text-xl">{quantity}</Text>

              <TouchableOpacity onPress={increaseQuantity} className="p-2 border border-primary rounded-full">
                <Plus stroke={primary} className="text-primary" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="my-3 flex flex-col">
            <Text className="font-medium">Category: {menuItem?.category}</Text>
          </View>

          <View className="flex flex-row items-center gap-2 my-3">
            <Clock stroke={primary} />
            <Text>{menuItem?.preparation_time || '15 mins'}</Text>
          </View>

          <MenuItemAddons addons={menuItem?.add_ons!} />

          <TouchableOpacity
            onPress={addItemToCart}
            className="bg-primary rounded-3xl py-4 flex flex-row items-center justify-center mt-32"
          >
            <RnText className="text-white font-medium">Add to Cart (₦{totalPrice})</RnText>
          </TouchableOpacity>
        </ScrollView>
      </Page>
    </SafeAreaView>
  );
}
