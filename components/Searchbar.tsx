import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, TextInput, StyleSheet } from "react-native";
import useThemeColor from "../hooks/useThemeColor";

const Searchbar: React.FC = () => {

    const primary = useThemeColor({}, "primary");

    const searchbarStyle = {
        borderColor: primary
    }

    return (
        <View style={[styles.searchbar, searchbarStyle]}>
            <FontAwesome color={primary} name="search"/>
            <TextInput 
                placeholder="Search" 
                style={{ fontWeight: "600", marginLeft: 7 }}
                placeholderTextColor={primary}
            />
        </View>

    )
};

const styles = StyleSheet.create({
    searchbar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 1,
        height: 44,
        paddingHorizontal: 10,
        marginBottom: 8
    },
})

export default Searchbar;