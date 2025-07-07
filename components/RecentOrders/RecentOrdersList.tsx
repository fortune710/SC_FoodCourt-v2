import React, { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native"
import RecentOrderCard from "./RecentOrdersCard"
import { Text } from "@/components/Themed";
import OrderDetailModal from "../Orders/OrderDetailModal";


const RecentOrdersList = ({ recentOrders }: { recentOrders: any[] }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string>("");

    const handleOrderPress = (orderId: string) => {
        console.log(orderId);
        setSelectedOrderId(orderId);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedOrderId("");
    };

    if (!recentOrders) {
        return (
            <View className="py-6 px-4 mx-4 flex flex-row item-center justify-center border border-zinc-800 rounded-2xl">
                <ActivityIndicator />
            </View>
        )
    }

    if (recentOrders?.length === 0) {
        return (
            <View className="py-6 px-4 mx-4 flex flex-row item-center justify-center border border-zinc-800 rounded-2xl" style={{ marginHorizontal: 16 }}>
                <Text>You have not made any recent orders</Text>
            </View>
        )
    }


    return (
        <>
            <FlatList
                horizontal
                data={recentOrders}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: { id, quantity, name, restaurant, status } }) => (
                    <RecentOrderCard
                        quantity={quantity}
                        name={name}
                        restaurant={restaurant}
                        status={status}
                        onPress={() => handleOrderPress(id)}
                    />
                )}
                contentContainerStyle={{ gap: 12, marginHorizontal: 16 }}
            />

            <OrderDetailModal
                visible={modalVisible}
                onClose={handleCloseModal}
                orderId={selectedOrderId}
            />
        </>
    )
}


export default RecentOrdersList