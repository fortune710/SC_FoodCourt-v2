import CategoriesList from "@/components/CategoriesList";
import Header from "@/components/Header";
import { Page } from "@/components/Themed";
import Modal from "@/components/ui/Modal";
import useThemeColor from "@/hooks/useThemeColor";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Chip, ListItem, Slider } from "@rneui/themed";
import { useState } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";

import vendors from "@/mock/vendors.json";
import orders from "@/mock/orders.json";
import Searchbar from "@/components/Searchbar";

export default function OrdersPage() {

    const allOrders = orders.reduce((grouped: any, item) => {
      const { orderId } = item;
    
      // Create a new group if it doesn't exist
      if (!grouped[orderId]) {
        grouped[orderId] = [];
      }
    
      // Add the current item to the group
      grouped[orderId].push(item);
    
      return grouped;
    }, {});

    const orderIds = Object.keys(allOrders)


    return (
        <Page style={{ paddingHorizontal: 16, paddingTop: 16 }}>

            <Searchbar />
            <ScrollView style={{flex: 1}}>
                <View style={{ height: 16 }} />
                {
                    orderIds.map((orderId) => {
                        const orders = allOrders[orderId] as OrderItem[];
                        return (
                            <View key={orderId} style={{ borderWidth: 1, borderRadius: 12, padding: 12, marginVertical: 4 }}>
                                <Text style={{ fontWeight: 'bold' }}>Order No: {orderId}</Text>
                                {/* <Text style={{ fontSize: 12, color: 'gray' }}>{orders[0].createdAt}</Text> */}
                                {
                                    orders.map((order) => (
                                        <View key={order.id} style={{ marginVertical: 8 }}>
                                            {
                                                order.products.map(({product, quantity}) => (
                                                    <View key={product.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Text>{quantity}x {product.name}</Text>
                                                        <Text>{product.price}</Text>
                                                    </View>
                                                ))
                                            }
                                        </View>
                                    ))
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>


        </Page>
    )
}

const FilterModal: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const primaryColor = useThemeColor({}, "primary");

    return (
        <>
            <Pressable onPress={() => setModalOpen(!modalOpen)}>
                <Text>Filter</Text>
                <MaterialCommunityIcons 
                    color={primaryColor} 
                    size={23}
                    name="filter-variant" 
                />
            </Pressable>
        
            <Modal isVisible={modalOpen}>
                <Pressable onPress={() => setModalOpen(!modalOpen)}>
                    <Ionicons name="ios-close-circle" color={primaryColor} size={25}/>
                </Pressable>
                
                <Text>Filter</Text>

                <View>
                    <Text>Vendors</Text>

                    <View>
                        {
                            vendors.map((vendor) => (
                                <Chip key={vendor.name}>
                                    {vendor.name}
                                </Chip>
                            ))
                        }
                    </View>
                </View>
                <View>
                    <View>
                        <Text>Price</Text>
                        <Text>From N500 to N5000</Text>

                        <Slider/>
                    </View>
                </View>
                <View>
                    <CategoriesList/>
                </View>

            </Modal>
        </>
    )
}