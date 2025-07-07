import { TouchableOpacity, View } from "react-native"
import { Text } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { OrderStatus } from "@/types";

const RecentOrderCard = ({ quantity, name, restaurant, status, onPress }: { quantity: number, name: string, restaurant: string, status: number, onPress?: () => void }) => {
    const statusColors = {
        0: "bg-yellow-300",
        1: "bg-[#F7E11E]",
        2: "bg-[#F7E11E]",
        3: "bg-[#37E80F]",
        4: "bg-green-600",
        5: "bg-[#F72F2F]",
    }


    return (
        <TouchableOpacity style={[styles.horizontalListItem, styles.cardStyle]} onPress={onPress}>
            <View style={{ gap: 4 }}>
                <View className='flex-row gap-2'>
                    <Text style={styles.mediumText}>{quantity}x</Text>
                    <Text style={styles.mediumText}>{name}</Text>
                </View>
                <Text style={styles.semiboldText}>{restaurant}</Text>
            </View>

            <View className={statusColors[status as 0 | 1 | 2 | 3 | 4 | 5]} style={styles.statusContainer}>
                <Text style={styles.statusText}> {OrderStatus[status]} </Text>
            </View>
        </TouchableOpacity>
    )
}

export default RecentOrderCard;

const styles = StyleSheet.create({
    horizontalListItem: {
        display: "flex",
        flexDirection: "column",
        // marginRight: 12,
    },
    cardStyle: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#7e7e7e",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 8,
        gap: 16,
        minWidth: 150
    },
    mediumText: { alignSelf: "flex-start", fontWeight: "500" },
    semiboldText: { alignSelf: "flex-start", fontWeight: "700" },
    statusContainer: {
        alignSelf: "flex-end",
        alignItems: "center",
        padding: 6,
        borderRadius: 16,
        width: 88
    },
    statusText: { color: "#000", fontSize: 12, textTransform: "capitalize", fontWeight: "700" }
})