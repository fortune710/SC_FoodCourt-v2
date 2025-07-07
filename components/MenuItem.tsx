import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Product } from '@/types';
import useThemeColor from '@/hooks/useThemeColor';

interface MenuItemProps {
    item: Product;
    restaurantId: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, restaurantId }) => {
    const primaryColor = useThemeColor({}, "primary")

    const priceTagColor = {
        color: primaryColor,
        borderColor: primaryColor,
        // backgroundColor: primaryColor + "50"
    }

    return (
        <Link href={`/item/${item.id}?restaurantId=${restaurantId}`} key={item.id}>
            <View className="border-b border-gray-200 w-full gap-2" style={{paddingBottom: 16, paddingHorizontal: 16}}>
                <View className="flex-row items-center justify-between">
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text className="text-lg font-bold">{item.name}</Text>
                        { item.description && <Text className="text-gray-500 mt-1">{item?.description}</Text> }
                    </View>

                    <View style={[styles.priceTag, priceTagColor]}>
                        <Text style={[priceTagColor, {fontWeight: 600, fontSize: 16}]}>
                            ₦ {new Intl.NumberFormat('en-US').format(item.price)}
                        </Text>
                    </View>
                </View>
            </View>
        </Link>
    );
};

export default MenuItem;

const styles= StyleSheet.create({
    priceTag: {
        height: '100%',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: "#F72F2F4C"
    },

    vendorName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#f72f2f'
    }
})