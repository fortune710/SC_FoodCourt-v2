import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { Product, Vendor, Category } from "@/types";

type SearchResult = 
  | (Product & { vendorName: string; categoryName: string; type: string })
  | (Vendor & { type: string })
  | (Category & { type: string });

interface Restaurant {
  name: string;
  id: number;
  image_url: string | null;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  resturant_id: number;
  restaurant: Restaurant;
}

export default function useSearch(query: string) {
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query.trim()) return [];

      // Search products
      const { data: products, error: productsError } = await supabase
        .from('menu_items')
        .select(`
          id,
          name,
          description,
          price,
          category,
          resturant_id,
          restaurant:resturant_id (
            name,
            id,
            image_url
          )
        `)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('is_disabled', false)
        .eq('is_deleted', false)
        .eq('restaurant.is_disabled', false);

      if (productsError) throw new Error(productsError.message);

      const productResults = (products as unknown as MenuItem[])?.map(item => ({
        ...item,
        vendorName: item.restaurant?.name || 'Unknown Vendor',
        categoryName: item.category || 'Uncategorized',
        type: 'product',
        image: item.restaurant?.image_url
      })) || [];

      // Search vendors
      const { data: vendors, error: vendorsError } = await supabase
        .from('restaurants')
        .select('*')
        .ilike('name', `%${query}%`)
        .eq('is_disabled', false);

      if (vendorsError) throw new Error(vendorsError.message);

      const vendorResults = vendors?.map(vendor => ({
        ...vendor,
        type: 'vendor'
      })) || [];

      // Search categories
      const { data: categories, error: categoriesError } = await supabase
        .from('menu_items')
        .select('category')
        .ilike('category', `%${query}%`)
        .eq('is_disabled', false)
        .eq('is_deleted', false);

      if (categoriesError) throw new Error(categoriesError.message);

      const categoryResults = [...new Set(categories?.map(item => item.category))].map(category => ({
        id: category,
        name: category,
        type: 'category'
      }));

      return [...productResults, ...vendorResults, ...categoryResults] as SearchResult[];
    },
    enabled: !!query.trim()
  });

  return {
    searchResults,
    isLoading
  };
} 