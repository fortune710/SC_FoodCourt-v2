import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, TextInput, StyleSheet, Text } from "react-native";
import useThemeColor from "../hooks/useThemeColor";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

const Searchbar: React.FC<{setQuery?: React.Dispatch<React.SetStateAction<any>>, query?: any}> = ({query, setQuery}) => {

    const primary = useThemeColor({}, "primary");
    // const [query, setQuery] = useState("");
    // const debouncedQuery = useDebounce(query, 500);

    // useEffect(() => {
    //     router.setParams({ query: debouncedQuery });
    // }, [debouncedQuery])

    const searchbarStyle = {
        borderColor: primary
    }

    return (
        <View style={[styles.searchbar, searchbarStyle]}>
            <FontAwesome color={primary} name="search"/>
            {/* <Text className="flex-1 font-semibold ml-2" style={{color: primary}}>Search</Text> */}
            <TextInput 
                placeholder="Search" 
                className="flex-1 font-semibold ml-2"
                placeholderTextColor={primary}
                onChangeText={setQuery}
                value={query}
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