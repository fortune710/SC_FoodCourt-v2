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
import { Button } from "@rneui/base";

interface HeaderProps {
    pageTitle: string
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
    // const navigation = useNavigation()
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    const primaryColor = useThemeColor({}, "primary");

    return (
        <View style={styles.header}>
            <Button color="#fff" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Ionicons name="menu" size={25} color={primaryColor} />
            </Button>
            {/* <DrawerToggleButton tintColor={primaryColor}></DrawerToggleButton> */}
            {/* <Text style={styles.title}>{pageTitle}</Text> */}
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
        paddingHorizontal: 8,
        paddingTop: 40,
        // height: 70,
        backgroundColor: "#fff"
    },
    title: {
        fontWeight: "900",
        fontSize: 24
    }
})

export default Header;