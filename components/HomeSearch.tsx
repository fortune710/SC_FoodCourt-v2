import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Image, Pressable, StyleSheet } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import useThemeColor from "../hooks/useThemeColor";
import useDebounce from "@/hooks/useDebounce";
import categories from "@/mock/categories.json";
import vendors from "@/mock/vendors.json";
import products from "@/mock/products.json";
import MenuItem from '@/components/MenuItem';
import CategoriesList from './CategoriesList';
import { Product, Vendor, Category } from '@/types';
import { scale, verticalScale } from "react-native-size-matters";
import Searchbar from './Searchbar';
import { PageScroll } from './Themed';


type SearchResult = 
  | (Product & { vendorName: string; categoryName: string; type: string })
  | (Vendor & { type: string })
  | (Category & { type: string });

const HomeSearch: React.FC<{setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>}> = ({setIsSearchActive}) => {
  const primary = useThemeColor({}, "primary");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchbarStyle = {
    borderColor: primary
}

  useEffect(() => {
    router.setParams({ query: debouncedQuery });

    if (debouncedQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredProducts = products.filter(item =>
      item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
    ).map(item => ({
      ...item,
      vendorName: vendors.find(v => v.id === item.vendorId)?.name || 'Unknown Vendor',
      categoryName: categories.find(c => c.id === item.categoryId)?.name || 'Uncategorized',
      type: 'product'
    }));

    const filteredVendors = vendors.filter(vendor =>
      vendor.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    ).map(vendor => ({
      ...vendor,
      type: 'vendor'
    }));

    const filteredCategories = categories.filter(category =>
      category.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    ).map(category => ({
      ...category,
      type: 'category'
    }));

    setSearchResults([...filteredProducts, ...filteredVendors, ...filteredCategories]);
  }, [debouncedQuery]);

  const productResults = searchResults.filter(result => result.type === 'product') as (Product & { vendorName: string; categoryName: string })[];
  const vendorResults = searchResults.filter(result => result.type === 'vendor') as Vendor[];
  const categoryResults = searchResults.filter(result => result.type === 'category') as Category[];



  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 8}}>
        <View style={[styles.searchbar, searchbarStyle, {width: '85%'}]}>
          <TextInput 
            placeholder="Search..." 
            style={{flex: 1, marginLeft: 8}}
            className="flex-1 font-semibold ml-4"
            placeholderTextColor={primary}
            onChangeText={setQuery}
            value={query}
          />
        </View>
        
        <Pressable style={{justifyContent: 'center'}} onPress={()=> setIsSearchActive(false)}>
          <Text style={{fontSize: 16, fontWeight: 600}}>Cancel</Text>
        </Pressable>
        
      </View>

      {searchResults.length === 0 && query !== '' ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('@/assets/images/no-results.svg')}/>
          <Text style={{fontSize: 16, fontWeight: 500}}>Sorry this item cannot be found</Text>
        </View>
      ) 
      
      : 
      
      ( query !== '' && (
        <View>
          <View style={{marginTop: 24, gap: 16}}>
            <Text style={{fontWeight: "900", fontSize: 20, paddingHorizontal: 16 }}>
                Vendors
            </Text>

            <View style={{ paddingHorizontal: 16, flexDirection: 'row', gap: 16}}>
              {vendorResults.length > 0 ? (
                vendorResults.map(vendor => (
                  <View key={vendor.id} style={{alignItems: 'center', gap: 8}}>
                    <Image
                      source={
                        vendor.image ? 
                        { uri: vendor.image } 
                        : 
                        require("@/assets/images/food.png") 
                      }
                      style={styles.restaurantLogo}
                    />

                    <Text style={{fontSize: 16, fontWeight: 500}}>{vendor.name}</Text>
                  </View>
                ))
              ) : (
                <Text style={{ paddingHorizontal: 16}}>No vendors found</Text>
              )}
            </View>
          </View>

          <View style={{marginTop: 32, gap: 16}}>
            <Text style={{fontWeight: "900", fontSize: 20, paddingHorizontal: 16 }}>
                Products
            </Text>

            {productResults.length > 0 ? (
              productResults.map(product => (
                <MenuItem item={product} />
              ))
            ) : (
              <Text style={{paddingHorizontal: 16}}> No products found</Text>
            )}
          </View>

          {/* <View style={{marginHorizontal: -16}}>
            {categoryResults.length > 0 ? (
              <CategoriesList filteredCategories={categoryResults}/>
            ) : (
              <Text>No categories found</Text>
            )}
          </View> */}

        </View>)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    searchbar: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      paddingHorizontal: 16, 
      borderWidth: 1, 
      borderRadius: 24, 
      height: scale(40), 
    },
    restaurantLogo: {
      width: 80,
      height: 80,
      borderRadius: 82,
      borderWidth: 3,
      borderColor: 'white'
  }
    
})

export default HomeSearch;