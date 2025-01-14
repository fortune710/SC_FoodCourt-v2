import React, { useEffect, useState } from 'react';

import { router } from "expo-router";
import { Product } from '@/types';
import useThemeColor from "../hooks/useThemeColor";
import useDebounce from "@/hooks/useDebounce";
import Searchbar from './Searchbar';



const CategorySearchbar: React.FC = () => {
  const [categoryQuery, setCategoryQuery] = useState("");
  const debouncedQuery = useDebounce(categoryQuery, 500);

  useEffect(() => {
    router.setParams({ query: debouncedQuery });

    if (!debouncedQuery.trim()) return;
  }, [debouncedQuery]);


  return (
    <Searchbar setQuery={setCategoryQuery} query={categoryQuery} showIcon/>
  );
};

export default CategorySearchbar;