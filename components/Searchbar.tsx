import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import useThemeColor from "../hooks/useThemeColor";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { scale, verticalScale } from "react-native-size-matters";

const Searchbar: React.FC<{ setQuery?: React.Dispatch<React.SetStateAction<any>>, query?: any, disable?: any, width?: string | number, showIcon?: any, color?: string , searchbarWithGradient?: boolean}> = ({ query, setQuery, disable, showIcon, width = '100%', color = '#000', searchbarWithGradient = false}) => {

    const primary = useThemeColor({}, "primary");
    // const [query, setQuery] = useState("");
    // const debouncedQuery = useDebounce(query, 500);

    // useEffect(() => {
    //     router.setParams({ query: debouncedQuery });
    // }, [debouncedQuery])

    const searchbarStyle = {
        borderColor: primary,
        width: width as any
    }

    return (
        searchbarWithGradient ? <LinearGradient
            colors={['#F34A4A1A', "#fff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0.5, 0.9]}
            style={[styles.searchbar, searchbarStyle]}
        >
            {showIcon ? <FontAwesome color="#F34A4A" name="search" size={24} /> : null}

            <TextInput
                style={[styles.searchInput, { color: color }]}
                placeholder="Search"
                className="flex-1 font-semibold ml-2"
                placeholderTextColor="#F34A4A"
                onChangeText={setQuery}
                value={query}
                editable={disable}
                selectTextOnFocus={disable}
            />
        </LinearGradient> :
        <View style={[styles.searchbar, searchbarStyle]}>
            {showIcon ? <FontAwesome color={primary} name="search" size={24}/> : null}
            <TextInput
                style={[styles.searchInput, { color: color }]}
                placeholder="Search"
                className="flex-1 font-semibold ml-2"
                placeholderTextColor="#F34A4A"
                onChangeText={setQuery}
                value={query}
                editable={disable}
                selectTextOnFocus={disable}
            />
        </View>

    )
};

const styles = StyleSheet.create({
    searchInput: { flex: 1, marginLeft: 8 },
    searchbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, borderWidth: 1, borderRadius: 24, height: scale(40) }
})

export default Searchbar;