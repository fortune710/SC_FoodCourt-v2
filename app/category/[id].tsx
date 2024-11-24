import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TextInput, Pressable } from 'react-native';
import categories from "@/mock/categories.json"
import vendors from "@/mock/vendors.json"
import products from "@/mock/products.json"
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Product } from '@/types';
import MenuItem from '@/components/MenuItem';
import useThemeColor from '@/hooks/useThemeColor';
import CategorySearchbar from '@/components/CategorySearch';
import { Page } from '@/components/Themed';

const CategoryPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const category = categories.find(category => category.id === id);
  const name = category?.name;
  const primary = useThemeColor({}, "primary");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const categoryProducts = useMemo(() => {
    return products.filter(product => product.categoryId === id);
  }, [id]);




  const groupedProducts = useMemo(() => {
    return (searchResults.length > 0 ? searchResults : categoryProducts).reduce((acc : {[key: string]: Product[]}, product) => {
      if (!acc[product.vendorId]) {
        acc[product.vendorId] = [];
      }
      acc[product.vendorId].push(product);
      return acc;
    }, {});
  }, [categoryProducts]);

  return (
    <Page style={styles.container}>
      <View style={{flexDirection: 'row', gap: 16, alignItems: 'center'}}>
            <Pressable
                  onPress={() => router.back()}
                  style={{ marginLeft: 12, marginTop: 8}}
              >
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', }}>
                  <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
                  <Text style={{fontSize:15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
                </View>
            </Pressable>
          {/* </View> */}
          
          <View style={{width: '60%'}}>
            <Text style={{ fontWeight:'bold', fontSize: 24, textAlign:'center', marginTop: 8}}>{name}</Text>
          </View>
        </View>

        <View style={{padding: 16}}>
          <CategorySearchbar products={categoryProducts} setSearchResults={setSearchResults} />
        </View>
        {/* <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color={primary} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={primary}
        />
      </View> */}

      <Text style={styles.subtitle}>Select item, then add to cart</Text>

      <ScrollView>
        {Object.entries(groupedProducts).map(([vendorId, vendorProducts]) => {
            const vendor = vendors.find(vendor => vendor.id === vendorId);
            return (
                <View key={vendorId} style={{marginBottom: 20}}>
                    <Text style={styles.restaurantName}>{vendor?.name}</Text>
                    {vendorProducts.map((item: Product) => (
                      <MenuItem key={item.id} item={item}/>
                    ))}
                </View>
            )})}
      </ScrollView>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', margin: 16, padding: 8, borderWidth: 1, borderColor: 'red', borderRadius: 25 },
  subtitle: { textAlign: 'center', marginBottom: 16 },
  restaurantName: { fontSize: 20, fontWeight: 'bold', color: 'red', marginTop: 16, marginLeft: 16 },
});

export default CategoryPage;