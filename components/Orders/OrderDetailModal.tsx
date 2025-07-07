import React from 'react';
import { Modal, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Text } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { useOrder } from '@/hooks/useOrder';
import { OrderStatus } from '@/types';

interface OrderDetailModalProps {
    visible: boolean;
    onClose: () => void;
    orderId: string;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ visible, onClose, orderId }) => {
    const { order, isLoading, error } = useOrder(orderId);

    const statusColors = {
        0: "#FEF3C7", // yellow-100
        1: "#F7E11E", // custom yellow
        2: "#F7E11E", // custom yellow
        3: "#D1FAE5", // green-100
        4: "#065F46", // green-800
        5: "#FEE2E2", // red-100
    };

    const statusTextColors = {
        0: "#92400E", // yellow-800
        1: "#000000", // black
        2: "#000000", // black
        3: "#065F46", // green-800
        4: "#FFFFFF", // white
        5: "#991B1B", // red-800
    };

    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 20 }}>
                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#f72f2f" />
                                <Text style={styles.loadingText}>Loading order details...</Text>
                            </View>
                        ) : error ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>Error: {error.message}</Text>
                            </View>
                        ) : !order ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>Order not found</Text>
                            </View>
                        ) : (
                            <View style={styles.orderDetails}>
                                <View style={styles.header}>
                                    <View style={{ width: 32 }} />
                                    <Text style={styles.title}>Order Details</Text>
                                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                        <X size={24} color="#000" />
                                    </TouchableOpacity>
                                </View>
                                {/* Order Info */}
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Order Information</Text>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Order ID:</Text>
                                        <Text style={styles.value}>{order.id}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Date:</Text>
                                        <Text style={styles.value}>
                                            {new Date(order.order_date).toLocaleDateString()} at{' '}
                                            {new Date(order.order_date).toLocaleTimeString()}
                                        </Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Customer:</Text>
                                        <Text style={styles.value}>{order.customer_name}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.label}>Status:</Text>
                                        <View
                                            style={[
                                                styles.statusBadge,
                                                { backgroundColor: statusColors[order.status as keyof typeof statusColors] }
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.statusText,
                                                    { color: statusTextColors[order.status as keyof typeof statusTextColors] }
                                                ]}
                                            >
                                                {OrderStatus[order.status]}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Order Items */}
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Order Items</Text>
                                    {order.order_items.map((item, index) => {
                                        const menuItem = item.menu_items as any;
                                        return (
                                            <View key={item.id} style={styles.orderItem}>
                                                <View style={styles.itemHeader}>
                                                    <Text style={styles.itemName}>{menuItem.name}</Text>
                                                    <Text style={styles.itemPrice}>
                                                        ₦ {new Intl.NumberFormat('en-US').format(menuItem.price)}
                                                    </Text>
                                                </View>
                                                {menuItem.description && (
                                                    <Text style={styles.itemDescription}>{menuItem.description}</Text>
                                                )}
                                                <View style={styles.itemFooter}>
                                                    <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                                                    <Text style={styles.itemTotal}>
                                                        Total: ₦ {new Intl.NumberFormat('en-US').format(menuItem.price * item.quantity)}
                                                    </Text>
                                                </View>
                                                {menuItem.restaurant && (
                                                    <Text style={styles.restaurantName}>
                                                        From: {menuItem.restaurant.name}
                                                    </Text>
                                                )}
                                            </View>
                                        );
                                    })}
                                </View>

                                {/* Order Total */}
                                <View style={styles.totalSection}>
                                    <View style={styles.totalRow}>
                                        <Text style={styles.totalLabel}>Total Amount:</Text>
                                        <Text style={styles.totalAmount}>
                                            ₦ {new Intl.NumberFormat('en-US').format(order.total_amount)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        maxHeight: '70%',
        maxWidth: '90%',
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 16,
        margin: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',

    },
    closeButton: {
        padding: 4,
    },
    content: {
        flex: 1,
        minHeight: 200,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    loadingText: {
        marginTop: 12,
        color: '#666',
    },
    errorContainer: {
        padding: 20,
        alignItems: 'center',
    },
    errorText: {
        color: '#f72f2f',
        textAlign: 'center',
    },
    orderDetails: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,


    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#000',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        flexWrap: 'wrap',
    },
    label: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    value: {
        fontSize: 14,
        color: '#000',
        fontWeight: '400',
        flex: 1,
        textAlign: 'right',
        marginLeft: 12,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    orderItem: {
        backgroundColor: '#f9fafb',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        flex: 1,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '500',
        color: '#f72f2f',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 18,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#666',
    },
    itemTotal: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    restaurantName: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
        marginTop: 4,
    },
    totalSection: {
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingTop: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: '700',
        color: '#f72f2f',
    },
});

export default OrderDetailModal; 