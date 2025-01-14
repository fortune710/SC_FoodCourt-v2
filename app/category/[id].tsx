import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TextInput, Pressable, ActivityIndicator, Platform } from 'react-native';
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
import useMenuItemCategory from '@/hooks/useMenuItemCategory';
import { verticalScale } from 'react-native-size-matters';
import { StatusBar } from 'expo-status-bar';

const CategoryPage = () => {
  const router = useRouter();
  const { id: categoryName, query, vendor } = useLocalSearchParams();
  //const primary = useThemeColor({}, "primary");

  const { menuItems, isLoading, error } = useMenuItemCategory(categoryName as string, vendor as string);

  return (
    <Page style={styles.container}>
      <StatusBar style='light'/>
      <View style={{flexDirection: 'row', gap: 16, alignItems: 'center'}}>
        
        <Pressable onPress={() => router.back()} style={{ marginLeft: 12, marginTop: 8}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', }}>
              <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
              
              <Text style={{fontSize:15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
            </View>
        </Pressable>

          
        <View style={{width: '60%'}}>
          <Text style={{ fontWeight:'bold', fontSize: 24, textAlign:'center', marginTop: 8}}>{categoryName}</Text>
        </View>
      </View>

      <View className='p-4'>
        <CategorySearchbar />
      </View>

      <Text style={styles.subtitle}>Select item, then add to cart</Text>

      <ScrollView contentContainerClassName='pb-32'>
        {
          isLoading ? (
            <View>
              <ActivityIndicator/>
            </View>
          )
          : error ? (
            <View>
              <Text>An error occurred</Text>
            </View>
          ) 
          :
          <>
            {
              !query ? 
              menuItems?.map((menuItem: any, index: number) => {
                const vendor = (menuItem.restaurant as any)?.name;
                const vendorId = (menuItem.restaurant as any)?.id;

                if (!vendorId && !vendor) return null;
    
                return (
                    <View key={vendorId + index} style={{ gap: 16, marginTop: 16 }}>
                      <Text style={styles.restaurantName}>{vendor}</Text>
                        {
                          menuItem.items.map((item: Product) => (
                            <MenuItem restaurantId={vendorId} key={item?.id} item={item}/>
                          ))
                        }
                    </View>
                )
              })

              :

              menuItems?.filter((menuItem: any) => {
                const filteredItems = menuItem.items.filter((menuItem: { name: string }) => {
                  return menuItem?.name.toLowerCase().includes((query as string).toLowerCase())
                })
                return filteredItems.length > 0
              })
              .map((menuItem: any, index: number) => {
                const vendor = (menuItem.restaurant as any)?.name;
                const vendorId = (menuItem.restaurant as any)?.id;
    
                return (
                    <View key={vendorId + index} style={{ gap: 16, marginTop: 16 }}>
                      <Text style={styles.restaurantName}>{vendor}</Text>
                        {
                          menuItem.items.map((item: Product) => (
                            <MenuItem restaurantId={vendorId} key={item?.id} item={item}/>
                          ))
                        }
                    </View>
                )
              })
            }
          </>
        }
      </ScrollView>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white'},
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', margin: 16, padding: 8, borderWidth: 1, borderColor: 'red', borderRadius: 25 },
  subtitle: { textAlign: 'center' },
  restaurantName: { fontSize: 20, fontWeight: 'bold', color: 'red', marginTop: 16, marginLeft: 16 },
});

export default CategoryPage;