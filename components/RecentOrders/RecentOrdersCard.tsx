import { TouchableOpacity, View } from "react-native"
import { Text } from "@/components/Themed";
import { StyleSheet } from "nativewind";
import { OrderStatus } from "@/types";

const RecentOrderCard = ({ name, restaurant, status }: { name: string, restaurant: string, status: number }) => {
    return (
        <TouchableOpacity style={[styles.horizontalListItem, styles.cardStyle]}>
            <Text style={styles.mediumText}>{name}</Text>
            <Text style={styles.semiboldText}>{restaurant}</Text>

            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{OrderStatus[status]}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default RecentOrderCard;

const styles = StyleSheet.create({
    horizontalListItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: 12,
    },
    cardStyle: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#C2C2C2",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 8 
    },
    mediumText: { alignSelf: "flex-start", fontWeight: "500" },
    semiboldText: { alignSelf: "flex-start", fontWeight: "700" },
    statusContainer: { 
        backgroundColor: "#FFD686", 
        alignSelf: "flex-end", 
        padding: 6, 
        borderRadius: 16 
    },
    statusText: { color: "#000", textTransform: "capitalize", fontWeight: "700" }
})