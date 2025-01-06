import { CartItemAlt } from "@/types"

export function groupArrayBy(array: any[], key: string) {
    return array?.reduce((result, currentItem) => {
      // Get the value of the key we're grouping by
      const groupKey = currentItem[key];
      
      // If an array doesn't exist for this key, create it
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      
      // Push the entire item to the array for this key
      result[groupKey].push(currentItem);
      
      return result;
    }, {});
}


export function groupArrayAsArray<T extends string>(array: any[], key: T) {
  return array?.reduce((result, currentItem) => {
    // Get the value of the key we're grouping by
    const value = currentItem[key];
    const valueId = value?.id || value; // Handle both object and primitive values
    
    // Find existing group by value id or value itself
    const existingGroup = result.find((item: any) => {
      const itemValue = item[key];
      const itemId = itemValue?.id || itemValue;
      return itemId === valueId;
    });
    
    if (!existingGroup) {
      // Create new group if it doesn't exist
      result.push({ 
        [key]: value,
        items: [currentItem] 
      });
    } else {
      // Add item to existing group
      existingGroup.items.push(currentItem);
    }
    
    return result;
  }, []);
}

interface GroupedCartItems {
  restaurant_subaccount_code: string;
  total_price: number;
}

export function groupCartItemsByRestaurant(cartItems: CartItemAlt[]): GroupedCartItems[] {
  // Create a map to group items by restaurant_subaccount_code
  const groupedMap = cartItems?.reduce((acc, item) => {
    const code = item.restaurant_subaccount_code;
    
    if (!acc.has(code)) {
      acc.set(code, {
        restaurant_subaccount_code: code,
        total_price: 0,
      });
    }
    
    const group = acc.get(code)!;
    group.total_price += (item.menu_item.price * item.quantity);
    
    return acc;
  }, new Map<string, GroupedCartItems>());

  // Convert the map to an array
  return Array.from(groupedMap?.values());
}

export function calculateServiceCharge(amount: number) {
  const paystackCharge = amount < 2500 
    ? 0.015 * amount 
    : 0.015 * amount + 100;

  const baseCharge = amount <= 3500 
    ? 160 
    : 210;

  return paystackCharge + baseCharge;
}