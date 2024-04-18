import CategoriesList from "@/components/CategoriesList";
import Header from "@/components/Header";
import { Page } from "@/components/Themed";
import Modal from "@/components/ui/Modal";
import useThemeColor from "@/hooks/useThemeColor";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Chip, ListItem, Slider } from "@rneui/themed";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

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
            <View style={{ height: 16 }} />

            {
                orderIds.map((orderId) => {

                    const orders = allOrders[orderId] as OrderItem[];
                    return (
                        <ListItem.Accordion
                            content={
                                <ListItem.Content>
                                    <ListItem.Title>Order {orderId}</ListItem.Title>
                                </ListItem.Content>
                            }

                            style={{ borderWidth: 1, borderRadius: 12 }}

                            key={orderId}
                        
                        >
                            {
                                orders.map((order) => (
                                    <ListItem>
                                        {
                                            order.products.map(({product, quantity}) => (
                                                <>
                                                    <ListItem.Title>{quantity}x {product.name}</ListItem.Title>
                                                    <ListItem.Subtitle>{product.price}</ListItem.Subtitle>
                                                </>
                                            ))
                                        }
                                    </ListItem>
                                ))
                            }
                        </ListItem.Accordion>
                    )
                })
            }

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