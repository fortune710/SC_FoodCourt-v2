import { useRouter } from "expo-router"
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Text } from "@/components/Themed";


const RestaurantCard = ({ id, name }: { id: number, name: string }) => {
    const router = useRouter();

    const moveToVendorPage = () => router.push(`/vendor/${id}`)

    return (
        <TouchableOpacity 
            onPress={moveToVendorPage} 
            style={[styles.horizontalListItem, styles.vendorCard]}
        >
            <Image 
                style={styles.backgroundImage} 
                source={require("@/assets/images/food.png")}
            />
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    horizontalListItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: 12,
    },
    vendorCard: {
        backgroundColor: "red",
        marginRight: 0,
        height: 100,
        borderRadius: 12,
        marginVertical: 7,
        justifyContent: "center",
        position: "relative"
    },
    backgroundImage: { 
        width: "100%", 
        height: "100%", 
        position: "absolute", 
        zIndex: -10, 
        borderRadius: 12 
    },
    text: { color: "#fff" }
})

export default RestaurantCard;