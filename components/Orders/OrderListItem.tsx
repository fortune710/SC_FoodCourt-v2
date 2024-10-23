import { View, Text } from "react-native";

export default function OrderListItem({ order }: { order: any }) {
    return (
        <View className="border-[1px] rounded-xl p-3 my-1">
            <Text className="font-bold">Order No: {order?.id}</Text>
            <View className="my-2">
                {
                    order?.order_items?.map(({ menu_items, quantity, menu_item_id }: any) => (
                        <View key={menu_item_id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>{quantity}x {(menu_items as any).name}</Text>
                            <Text>{(menu_items as any).price}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}