import { CategoryName } from "@/components/CategoriesList";
import { Timestamp } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";

export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    categoryId: string,
    vendorId: string,
    image?: string
}

export interface CartItem {
    id: string;
    cartId: string;
    product: Product;
    quantity: number
}

export interface CartItemAlt {
    id: number;
    menu_item_id: number;
    quantity: number;
    user_id: string;
    menu_item: {
      resturant_id: number,
      price: number,
      name: string,
      description: string
    };
    restaurant_subaccount_code: string
  }

export interface OrderItem {
    id: string;
    orderId: string;
    status: "preparing"|"prepared"|"canceled",
    products: CartItem[]
}

export interface Addon {
    foodName: string,
    price: number
}

export interface MenuItem {
    name: string,
    add_ons: Addon[],
    resturant_id: number,
    price: number,
    id: number,
    category: string,
    quantity: number,
    description: string,
    preparation_time: string,
}

export interface Vendor {
    id: string,
    name: string
}

export interface TranactionSplitData {
    subaccount: string,
    share: number
}

export interface TransactionData {
    email: string,
    amount: number,
    subaccounts: TranactionSplitData[],
    cartItems: CartItemAlt[],
    customerName: string,
}

export interface Category{
    id: string,
    name: CategoryName,
    image: string,
}

export enum OrderStatus {
    New = 0,
    Accepted = 1,
    Preparing = 2,
    Completed = 3,
    Collected = 4,
    Cancelled = 5,
}
