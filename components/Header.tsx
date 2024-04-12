import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { View, StyleSheet, Text } from "react-native";
import useThemeColor from "../hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";

interface HeaderProps {
    pageTitle: string
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
    const navigation = useNavigation()

    const primaryColor = useThemeColor({}, "primary");

    return (
        <SafeAreaView style={styles.header}>
            {/* <Ionicons name="menu" size={25} color={primaryColor} /> */}
            <DrawerToggleButton tintColor={primaryColor}></DrawerToggleButton>
            <Text>{pageTitle}</Text>
            <MaterialCommunityIcons size={25} name="cart" color={primaryColor}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 16,
        paddingHorizontal: 12,
        // height: 70,
        backgroundColor: "#fff"
    },
})

export default Header;