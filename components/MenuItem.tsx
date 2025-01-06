import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Product } from '@/types';

interface MenuItemProps {
    item: Product;
    restaurantId: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, restaurantId }) => {
    return (
        <Link href={`/item/${item.id}?restaurantId=${restaurantId}`} key={item.id}>
            <View className="flex-row items-center justify-between p-4 border-b border-gray-200 w-full">
                <View style={{ flex: 1, marginRight: 8 }}>
                    <Text className="text-lg font-bold">{item.name}</Text>
                    { item.description && <Text className="text-gray-500 mt-1">{item?.description}</Text> }
                </View>

                <View>
                    <Text className="text-white font-bold bg-red-500 p-2 rounded-full text-right">
                        ₦ {item.price}
                    </Text>
                </View>
            </View>
        </Link>
    );
};

export default MenuItem;
