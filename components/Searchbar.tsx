import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Image, Pressable } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import useThemeColor from "../hooks/useThemeColor";
import useDebounce from "@/hooks/useDebounce";
import categories from "@/mock/categories.json"
import vendors from "@/mock/vendors.json"
import products from "@/mock/products.json"
import { Product } from '@/types';

const Searchbar: React.FC = () => {
  const primary = useThemeColor({}, "primary");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [searchResults, setSearchResults] = useState<Product[] & {vendorName: string, categoryName: string}[]>([]);

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
      <View className="flex-row items-center rounded-full border border-primary h-11 px-3 mb-2">
        <FontAwesome color={primary} name="search" size={16} />
        <TextInput 
          placeholder="Search" 
          className="flex-1 font-semibold ml-2"
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

export default Searchbar;