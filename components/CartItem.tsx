import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../context/CartContext";
import { CartItemType } from "../types";

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { addToCart, removeFromCart } = useCart();
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  return (
    <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
      <View className="flex-1 mr-3">
        <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>
          {product.productName}
        </Text>
        <Text className="text-xs text-gray-500 mt-0.5">
          ₱{product.price.toLocaleString()} × {quantity} = ₱
          {lineTotal.toLocaleString()}
        </Text>
      </View>

      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => removeFromCart(product.id)}
          className="bg-gray-200 w-7 h-7 rounded-full items-center justify-center"
        >
          <Text className="text-gray-700 font-bold text-sm">−</Text>
        </TouchableOpacity>
        <Text className="text-gray-900 font-semibold text-sm w-4 text-center">
          {quantity}
        </Text>
        <TouchableOpacity
          onPress={() => addToCart(product)}
          className="bg-indigo-600 w-7 h-7 rounded-full items-center justify-center"
        >
          <Text className="text-white font-bold text-sm">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
