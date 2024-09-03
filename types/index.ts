export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    categoryId: string,
    vendorId: string,
    image?: string
}

interface CartItem {
    id: string;
    cartId: string;
    product: Product;
    quantity: number
}

export interface OrderItem {
    id: string;
    orderId: string;
    status: "preparing"|"prepared"|"cancelled",
    products: CartItem[]
}

export interface Addon {
    foodName: string,
    price: number
}

export interface MenuItem {
    name: string,
    addons: Addon[],
    price: number,
    id: number,
    category: string,
    quantity: number
}
