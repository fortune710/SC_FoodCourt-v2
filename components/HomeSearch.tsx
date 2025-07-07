import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Image, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import useThemeColor from "../hooks/useThemeColor";
import useDebounce from "@/hooks/useDebounce";
import MenuItem from '@/components/MenuItem';
import CategoriesList from './CategoriesList';
import { Product, Vendor, Category } from '@/types';
import { scale, verticalScale } from "react-native-size-matters";
import Searchbar from './Searchbar';
import { PageScroll } from './Themed';
import useSearch from '@/hooks/useSearch';

type SearchResult =
  | (Product & { vendorName: string; categoryName: string; type: string })
  | (Vendor & { type: string })
  | (Category & { type: string });

const HomeSearch: React.FC<{ setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsSearchActive }) => {
  const primary = useThemeColor({}, "primary");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const { searchResults, isLoading } = useSearch(debouncedQuery);
  const searchbarStyle = {
    borderColor: primary
  }

  useEffect(() => {
    router.setParams({ query: debouncedQuery });
  }, [debouncedQuery]);

  const productResults = searchResults?.filter(result => result.type === 'product') as (Product & { vendorName: string; categoryName: string })[];
  const vendorResults = searchResults?.filter(result => result.type === 'vendor') as Vendor[];
  const categoryResults = searchResults?.filter(result => result.type === 'category') as Category[];

  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 8 }}>
        <View style={[styles.searchbar, searchbarStyle, { width: '85%' }]}>
          <TextInput
            placeholder="Search..."
            style={{ flex: 1, marginLeft: 8 }}
            className="flex-1 font-semibold ml-4"
            placeholderTextColor={primary}
            onChangeText={setQuery}
            value={query}
          />
        </View>

        <Pressable style={{ justifyContent: 'center' }} onPress={() => setIsSearchActive(false)}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Cancel</Text>
        </Pressable>
      </View>
      {vendorResults?.length === 0 && productResults?.length === 0 && <View style={{ marginTop: 32, gap: 16 }}>
            <Text style={{ fontWeight: "900", fontSize: 20, paddingHorizontal: 16 }}>
              No results found
            </Text>
          </View>
          }

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <ActivityIndicator size="large" color={primary} />
        </View>
      ) : searchResults?.length === 0 && query !== '' ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('@/assets/images/no-results.svg')} />
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Sorry this item cannot be found</Text>
        </View>
      ) : query !== '' && (
        <View>
          {vendorResults?.length > 0 && <View style={{ marginTop: 24, gap: 16 }}>
            <Text style={{ fontWeight: "900", fontSize: 20, paddingHorizontal: 16 }}>
              Vendors
            </Text>

            <View style={{ paddingHorizontal: 16, flexDirection: 'row', gap: 16 }}>
              {vendorResults?.length > 0 ? (
                vendorResults.map(vendor => (
                  <View key={vendor.id} style={{ alignItems: 'center', gap: 8 }}>
                    <Image
                      source={
                        vendor.image_url ?
                          { uri: vendor.image_url }
                          :
                          require("@/assets/images/food.png")
                      }
                      style={styles.restaurantLogo}
                    />

                    <Text style={{ fontSize: 16, fontWeight: 500 }}>{vendor.name}</Text>
                  </View>
                ))
              ) : null}
            </View>
          </View>}

          {productResults?.length > 0 && <View style={{ marginTop: 32, gap: 16 }}>
            <Text style={{ fontWeight: "900", fontSize: 20, paddingHorizontal: 16 }}>
              Products
            </Text>

            {productResults?.length > 0 ? (
              productResults.map(product => (
                <MenuItem key={product.id} item={product} restaurantId={product.resturant_id} />
              ))
            ) : null}
          </View>}

         

          {/* <View style={{marginHorizontal: -16}}>
            {categoryResults?.length > 0 ? (
              <CategoriesList filteredCategories={categoryResults}/>
            ) : (
              <Text>No categories found</Text>
            )}
          </View> */}
        </View>
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
});

export default HomeSearch;