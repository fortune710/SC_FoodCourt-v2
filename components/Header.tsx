import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { View, StyleSheet, Text } from "react-native";
import useThemeColor from "../hooks/useThemeColor";
import { Link } from "expo-router";
import DrawerButton from "./DrawerButton";

interface HeaderProps {
    pageTitle: string
    altColor?: boolean
    altBack?: boolean
}

const Header: React.FC<HeaderProps> = ({ pageTitle, altColor, altBack }) => {
    const primaryColor = useThemeColor({}, "primary");

    return (
        <View style={{...styles.header, backgroundColor: altBack ? "#f72f2f" : "#fff"}}>
            <DrawerButton iconColor={altColor ? "#fff" : primaryColor}/>
            <Link href="/cart/shopping-cart-full" asChild>
                <MaterialCommunityIcons size={25} name="cart" color={altColor ? "#fff" : primaryColor}/>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingTop: 40,
        // height: 70,
    },
    title: {
        fontWeight: "900",
        fontSize: 24
    }
})

export default Header;