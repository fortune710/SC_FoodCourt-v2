import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";

export function useOrder(orderId: string) {
    const { currentUser } = useCurrentUser();
  
    async function getOrder() {
      if (!orderId) throw new Error('Order ID is required');
  
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          status,
          total_amount,
          order_date,
          customer_name,
          user_id,
          order_items:order_items (
            id,
            order_id,
            menu_item_id,
            quantity,
            menu_items:menu_item_id (
              name,
              price,
              description,
              restaurant:resturant_id (
                id,
                name,
                address
              )
            )
          )
        `)
        .eq('id', orderId)
        .eq('user_id', currentUser?.id!)
        .single();
  
      if (error) throw new Error(error.message);
      return data;
    }
  
    const { data: order, isLoading, error, refetch } = useQuery({
      queryKey: ["order", orderId],
      queryFn: getOrder,
      enabled: !!currentUser && !!orderId,
    });
  
    return {
      order,
      isLoading,
      error,
      refetch
    };
  }