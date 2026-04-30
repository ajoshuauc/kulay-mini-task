export interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
}

export interface CartItemType {
  product: Product;
  quantity: number;
}
