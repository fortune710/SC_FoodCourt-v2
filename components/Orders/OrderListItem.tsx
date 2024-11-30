import { View, Text, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { OrderStatus } from "@/types";
import { calculateServiceCharge } from "@/utils/functions";
import Button from "../ui/Button";

function formatDateTime(dateInput: Date | string) {
    const date = dateInput ? new Date(dateInput) : new Date();
    
    // Format date as DD-MM-YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Format time as HH:MM
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return {
        date: `${day}-${month}-${year}`,
        time: `${hours}:${minutes}`
    };
}

export default function OrderListItem({ order }: { order: any }) {
    const { date, time } = formatDateTime(order.order_date);

    const statusColors = {
        0: "bg-yellow-300",
        1: "bg-[#F7E11E]",
        2: "bg-[#F7E11E]",
        3: "bg-[#37E80F]",
        4: "bg-green-600",
        5: "bg-[#F72F2F]",
    }

    const subCharge = calculateServiceCharge(order?.total_amount || 0);
    const convertToKobo = 100;

    return (
        <View className="border-[1px] rounded-xl p-3 my-2">
            <View className="border-b px-1 py-1 gap-1">
                <View style={styles.row}>
                    <Text style={styles.orderNo}>
                        Order No: {order?.id!}
                    </Text>
                    <Text style={styles.date}>{date}</Text>
                </View>

                <View style={[styles.row, {justifyContent: 'flex-end'}]}>
                    <Text style={styles.time}>{time}</Text>
                </View>
            </View>

            <View style={{gap: 8, marginVertical: 12}}>
                {order?.order_items?.map(({ menu_items, quantity, menu_item_id }: any) => (
                    <View style={{gap: 4}}>
                        <View style= {{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontWeight: 700, fontSize: 16, color: '#f72f2f'}}>{(menu_items as any).restaurant.name}</Text>
                            <View className={statusColors[order?.status as 0 | 1 | 2 | 3 | 4 | 5]} style={styles.statusContainer}>
                                <Text style={styles.statusText}> {OrderStatus[order?.status]} </Text>
                            </View>
                        </View>

                        <View key={menu_item_id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8}}>
                            <Text style={styles.itemPrice}>{quantity}x {(menu_items as any).name}</Text>
                            <Text style={styles.itemPrice}>₦ {(menu_items as any).price}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={{borderTopWidth: 1, paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                {/*
                Usiere- Please Fix
                
                <Button 
                    buttonStyle={styles.button}
                    titleStyle={{color: '#000', fontSize: 14}}
                    onPress={() => console.log('Fortune oh')}
                >
                    Order Again
                </Button> */}
                
                <View/>

                <View style={{flexDirection: 'row', gap: 40}}>
                    <View style={{borderWidth: 0, gap: 8}}>
                        <Text style={styles.orderPriceBreaks}>Subtotal</Text>
                        <Text style={styles.orderPriceBreaks}>Service Charge</Text>
                        <Text style={[styles.orderPriceBreaks, {fontWeight: 700}]}>Total</Text>
                    </View>

                    <View style={{borderWidth: 0, gap: 8}}>
                        <Text style={styles.orderPriceBreaks}> ₦ {order?.total_amount}</Text>
                        <Text style={styles.orderPriceBreaks}> ₦ {subCharge}</Text>
                        <Text style={[styles.orderPriceBreaks, {fontWeight: 700}]}> ₦ {order?.total_amount + subCharge }</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
        marginBottom: 5
    },
    orderNo: {
        justifyContent: "space-between",
        alignItems: "stretch",
        display: "flex",
        fontWeight: 'semibold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        // fontWeight: "bold",
        color: '#000'
    },
    customerLabel: {
        display: "flex",
        fontWeight: 'regular',
        fontSize: scale(12)
    },
    time: {
        textAlign: "right",
        // fontWeight: "bold"
    },
    statusContainer: { 
        alignSelf: "flex-end", 
        alignItems: "center",
        padding: 6, 
        borderRadius: 16, 
        width: 88
    },
    statusText: { 
        color: "#000", 
        fontSize: 12, 
        textTransform: "capitalize", 
        fontWeight: "700" 
    },
    itemPrice: {
        fontWeight: 600, 
        fontSize: 16
    },
    orderPriceBreaks: {
        fontSize: 16,
        fontWeight: 500
    },
    button: {
        marginTop: 8, 
        paddingVertical: 8, 
        paddingHorizontal: 16, 
        borderWidth: 1, 
        borderColor: '#f72f2f', 
        backgroundColor: '#fff'
    }

})