interface Product {
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

interface OrderItem {
    id: string;
    orderId: string;
    status: "preparing"|"prepared"|"cancelled",
    products: CartItem[]
}