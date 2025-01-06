import { groupArrayAsArray } from "@/utils/functions";
import { supabase } from "@/utils/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export default function useMenuItemCategory(categoryName: string, vendor?: string) {

    async function getMenuItemCategory(categoryName: string, vendor?: string) {
        let groupedResults: any[] = [];
        let fetchError: PostgrestError | null = null;

        if (!vendor) {
            const { data, error } = await supabase
                .from('menu_items')
                .select(`
                    id,
                    name,
                    quantity,
                    price,
                    add_ons,
                    description,
                    resturant_id,
                    category,
                    restaurant:resturant_id (
                        name,
                        id
                    )
                `)
                .eq('category', categoryName)
                .eq('is_disabled', false)
                .eq('is_deleted', false)

            groupedResults = groupArrayAsArray(data!, "restaurant");
            fetchError = error;
        } else {
            const { data, error } = await supabase
                .from('menu_items')
                .select(`
                    id,
                    name,
                    quantity,
                    price,
                    add_ons,
                    description,
                    resturant_id,
                    category,
                    restaurant:resturant_id (
                        name,
                        id
                    )
                `)
                .eq('category', categoryName)
                .eq('resturant_id', Number(vendor))
                .eq('is_disabled', false)
                .eq('is_deleted', false)

            groupedResults = groupArrayAsArray(data!, "restaurant");
            fetchError = error;

        }

        
        if (error) throw new Error(error.message);

        return groupedResults
    }

    const { data: menuItems, error, isLoading } = useQuery({
        queryKey: ['category', categoryName],
        queryFn: async () => getMenuItemCategory(categoryName, vendor),
        enabled: !!categoryName,
    })

    return {
        menuItems,
        error,
        isLoading
    }
}