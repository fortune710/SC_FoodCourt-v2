import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { View, StyleSheet, Text } from "react-native";
import useThemeColor from "../hooks/useThemeColor";

interface HeaderProps {
    pageTitle: string
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {

    const primaryColor = useThemeColor({}, "primary");

    return (
        <View style={styles.header}>
            <Ionicons name="menu" size={25} color={primaryColor}/>
            <Text>{pageTitle}</Text>
            <MaterialCommunityIcons size={25} name="cart" color={primaryColor}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        height: 70,
        backgroundColor: "#fff"
    },
})

export default Header;