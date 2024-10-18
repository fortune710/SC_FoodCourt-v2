import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { View, StyleSheet, Text } from "react-native";
import useThemeColor from "../hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    DrawerActions,
    ParamListBase,
    useNavigation,
  } from '@react-navigation/native';
// import { useNavigation } from "expo-router";
import { DrawerNavigationProp, DrawerToggleButton } from "@react-navigation/drawer";
import { Button, color } from "@rneui/base";
import { Link } from "expo-router";

interface HeaderProps {
    pageTitle: string
    altColor?: boolean
}

const Header: React.FC<HeaderProps> = ({ pageTitle, altColor }) => {
    // const navigation = useNavigation()
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    const primaryColor = useThemeColor({}, "primary");

    return (
        <View style={[styles.header, {backgroundColor: altColor ? primaryColor :  "#fff"}]}>
            <Button color={altColor ? primaryColor : "#fff"} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Ionicons name="menu" size={25} color={altColor ? "#fff" : primaryColor} />
            </Button>
            {/* <DrawerToggleButton tintColor={primaryColor}></DrawerToggleButton> */}
            {/* <Text style={styles.title}>{pageTitle}</Text> */}
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