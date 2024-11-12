import { TouchableOpacity, View } from "react-native"
import { Text } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { OrderStatus } from "@/types";

const RecentOrderCard = ({ name, restaurant, status }: { name: string, restaurant: string, status: number }) => {
    const statusColors = {
        0: "bg-yellow-300",
        1: "bg-[#FFD686]",
        2: "bg-[#FFD686]",
        3: "bg-green-300",
        4: "bg-green-600",
    }

    
    return (
        <TouchableOpacity style={[styles.horizontalListItem, styles.cardStyle]}>
            <Text style={styles.mediumText}>{name}</Text>
            <Text style={styles.semiboldText}>{restaurant}</Text>

            <View className={statusColors[status as 0 | 1 | 2 | 3 | 4]} style={styles.statusContainer}>
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
        alignSelf: "flex-end", 
        padding: 6, 
        borderRadius: 16 
    },
    statusText: { color: "#000", fontSize: 12, textTransform: "capitalize", fontWeight: "700" }
})