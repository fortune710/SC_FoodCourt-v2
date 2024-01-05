import { Text } from '../components/Themed';
import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';



interface CartItemProps {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }
  
  const CartItem: React.FC<CartItemProps> = ({ name, description, price, quantity }) => {
    const [qty, setQty] = useState(quantity);

    const handleIncrement = () => {
      if (qty == 20) {}
      else {setQty(qty + 1)}
    };
  
    const handleDecrement = () => {
        if (qty == 1) {}
        else {setQty(qty - 1)}
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}># {price}</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <Pressable onPress={handleIncrement} style={styles.actionButton}>
            <View style={styles.iconContainer}>
              <Feather name="plus-circle" size={18} color="white" />
            </View>
          </Pressable>
          <Text style={styles.amountText}>{qty}</Text>
          <Pressable onPress={handleDecrement} style={styles.actionButton}>
            <View style={styles.iconContainer}>
              <Feather name="minus-circle" size={18} color="white" />
            </View>
          </Pressable>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: '90%',
      height: 100,
      alignSelf: 'center',
      marginBottom: 15,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 15,
    },
    descriptionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 2,
    },
    description: {
      fontSize: 13,
      width: '70%',

    },
    priceContainer: {
      width: '23%',
      height: 30,
      borderWidth: 1.5,
      borderColor: '#fe0000',
      backgroundColor: '#fe00002e',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    priceLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fe0000',
      marginHorizontal: 2,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '30%',
      marginTop:10,
    },
    actionButton: {
      backgroundColor: '#f7941e',
      width: 35,
      height: 25,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    amountText: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '500',
    },
  });
  
  export default CartItem;