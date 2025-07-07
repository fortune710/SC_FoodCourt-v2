import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { View, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import useThemeColor from "../hooks/useThemeColor";
import { Link } from "expo-router";
import DrawerButton from "./DrawerButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useCurrentUser from "@/hooks/useCurrentUser";
import useCart from "@/hooks/useCart";

interface HeaderProps {
    pageTitle: 'Home' | 'Profile' | 'Order History' | 'Settings'
    altColor?: boolean
    altBack?: boolean
}

const Header: React.FC<HeaderProps> = ({ pageTitle, altColor, altBack }) => {
    const primaryColor = useThemeColor({}, "primary");

    const { top } = useSafeAreaInsets();

    const { currentUser } = useCurrentUser();
    const { cartItems: dbCartItems, isLoading } = useCart(currentUser?.id!);

    return (
        <SafeAreaView style={{ backgroundColor: altBack ? "#f72f2f" : "#fff" }}>
            <View
                style={{
                    ...styles.header,
                    backgroundColor: altBack ? "#f72f2f" : "#fff"
                }}
            >
                <DrawerButton iconColor={altColor ? "#fff" : primaryColor} />

                {pageTitle === 'Order History' || 'Settings' ? <Text style={{ fontSize: 20, fontWeight: 600, color: pageTitle === 'Order History' ? '#000' : "#fff" }}>{pageTitle}</Text> : null}

                {/* Cart with conditional image overlay */}
                <View style={styles.cartContainer}>
                    <Link href={dbCartItems && dbCartItems?.length > 0 ? "/cart/shopping-cart-full" : "/cart/shopping-cart-empty"} disabled={isLoading} asChild>
                        <MaterialCommunityIcons size={25} name="cart" color={altColor ? "#fff" : primaryColor} />
                    </Link>
                    {pageTitle === 'Home' && (
                        <Image
                            source={require('../assets/images/design.png')}
                            style={styles.cartOverlayImage}
                            resizeMode="contain"
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingTop: 16,
    },
    title: {
        fontWeight: "900",
        fontSize: 24
    },
    cartContainer: {
        position: 'relative',
    },
    cartOverlayImage: {
        position: 'absolute',
        top: -20,
        right: -40,
        width: 200,
        height: 200,
        zIndex: 1,
    }
})

export default Header;