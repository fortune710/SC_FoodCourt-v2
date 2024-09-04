import React, { SetStateAction, useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Image, Pressable, StyleSheet } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import useThemeColor from "../hooks/useThemeColor";
import useDebounce from "@/hooks/useDebounce";
import categories from "@/mock/categories.json"
import vendors from "@/mock/vendors.json"
import products from "@/mock/products.json"
import { Product } from '@/types';

const HomeSearch: React.FC<{setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>}> = ({setIsSearchActive}) => {
  const primary = useThemeColor({}, "primary");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [searchResults, setSearchResults] = useState<Product[] & {vendorName: string, categoryName: string}[]>([]);
  const searchbarStyle = {
    borderColor: primary
}

  useEffect(() => {
    router.setParams({ query: debouncedQuery });

    if (debouncedQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = products.filter(item =>
      item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const resultsWithDetails = filteredResults.map(item => ({
      ...item,
      vendorName: vendors.find(v => v.id === item.vendorId)?.name || 'Unknown Vendor',
      categoryName: categories.find(c => c.id === parseInt(item.categoryId))?.name || 'Uncategorized',
    }));

    setSearchResults(resultsWithDetails);
  }, [debouncedQuery]);

  const renderItem = ({ item } : {item : Product & {vendorName: string, categoryName: string}}) => (
    <Pressable className="flex-row p-4 border-b border-gray-200">
      <Image 
        source={{ uri: `` }} 
        className="w-20 h-20 rounded-md"
      />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold">{item.name}</Text>
        <Text className="text-sm text-gray-600">{item.description}</Text>
        <Text className="text-xs text-gray-500">{item.vendorName} • {item.categoryName}</Text>
        <Text className="text-sm font-semibold mt-1">${(item.price / 100).toFixed(2)}</Text>
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1">
      <View style={[styles.searchbar, searchbarStyle]} className="flex-row items-center rounded-full border-2 h-11 px-3 mb-2">
        <Pressable onPress={() => setIsSearchActive(false)} className="mr-2">
            <FontAwesome name="arrow-left" size={16} color={primary} />
        </Pressable>
        <TextInput 
          placeholder="Search..." 
          style={{flex: 1, marginLeft: 8}}
          className="flex-1 font-semibold ml-4"
          placeholderTextColor={primary}
          onChangeText={setQuery}
          value={query}
        />
      </View>
      {searchResults.length === 0 && query !== '' ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Sorry this item cannot be found</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    searchbar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 1,
        height: 44,
        paddingHorizontal: 10,
        marginBottom: 8,
    },
})

export default HomeSearch;