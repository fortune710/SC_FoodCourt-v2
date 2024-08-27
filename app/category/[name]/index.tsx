import React, { useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import categories from "@/mock/categories.json"
import vendors from "@/mock/vendors.json"
import products from "@/mock/products.json"
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const CategoryPage = () => {
  const router = useRouter();
  const name = "1" //route param

  const categoryProducts = useMemo(() => {
    return products.filter(product => product.categoryId === name);
  }, [name]);


  const groupedProducts = useMemo(() => {
    return categoryProducts.reduce((acc : {[key: string]: any}, product) => {
      if (!acc[product.vendorId]) {
        acc[product.vendorId] = [];
      }
      acc[product.vendorId].push(product);
      return acc;
    }, {});
  }, [categoryProducts]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="menu-outline" size={24} color="red" />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <TouchableOpacity onPress={() => router.push('/cart')}>
          <Icon name="cart-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="red" />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="red"
        />
      </View>

      <Text style={styles.subtitle}>Select item, then add to cart</Text>

      <ScrollView>
        {Object.entries(groupedProducts).map(([vendorId, vendorProducts]) => {
            const vendor = vendors.find(vendor => vendor.id === vendorId);
            return (
                <View key={vendorId}>
                    <Text style={styles.restaurantName}>{vendor?.name}</Text>
                    {vendorProducts.map((item: any) => (
                    <View key={item.id} style={styles.menuItem}>
                        <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        </View>
                        <View style={styles.priceTag}>
                        <Text style={styles.price}>₦ {item.price}</Text>
                        </View>
                    </View>
                    ))}
                </View>
            )})}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', margin: 16, padding: 8, borderWidth: 1, borderColor: 'red', borderRadius: 25 },
  searchInput: { flex: 1, marginLeft: 8, color: 'red' },
  subtitle: { textAlign: 'center', marginBottom: 16 },
  restaurantName: { fontSize: 20, fontWeight: 'bold', color: 'red', marginTop: 16, marginLeft: 16 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemInfo: { flex: 1, marginRight: 16 },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemDescription: { color: 'gray', marginTop: 4 },
  priceTag: { backgroundColor: 'red', borderRadius: 16, padding: 8 },
  price: { color: 'white', fontWeight: 'bold' },
});

export default CategoryPage;