import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart, removeFromCart, getQuantity } = useCart();
  const qty = getQuantity(product.id);

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
      <Text className="text-base font-semibold text-gray-900">
        {product.productName}
      </Text>
      <Text className="text-sm text-gray-500 mt-1 mb-3">
        {product.description}
      </Text>

      <View className="flex-row items-center justify-between">
        <Text className="text-base font-bold text-indigo-600">
          ₱{product.price.toLocaleString()}
        </Text>

        {qty === 0 ? (
          <TouchableOpacity
            onPress={() => addToCart(product)}
            className="bg-indigo-600 px-4 py-2 rounded-xl"
          >
            <Text className="text-white text-sm font-semibold">Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => removeFromCart(product.id)}
              className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
            >
              <Text className="text-gray-800 text-base font-bold">−</Text>
            </TouchableOpacity>
            <Text className="text-gray-900 font-semibold text-base w-5 text-center">
              {qty}
            </Text>
            <TouchableOpacity
              onPress={() => addToCart(product)}
              className="bg-indigo-600 w-8 h-8 rounded-full items-center justify-center"
            >
              <Text className="text-white text-base font-bold">+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
