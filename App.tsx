import "./global.css";

import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import CartItem from "./components/CartItem";
import ProductCard from "./components/ProductCard";
import { CartProvider, useCart } from "./context/CartContext";
import { PRODUCTS } from "./data/products";

function ShopScreen() {
  const {
    cartItems,
    totalItems,
    subtotal,
    discountAmount,
    finalTotal,
    discountApplied,
    voucherCode,
    voucherStatus,
    setVoucherCode,
    applyVoucher,
  } = useCart();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-900">Kulay Shop</Text>
        <View className="flex-row items-center gap-1.5">
          <Text className="text-base">🛒</Text>
          {totalItems > 0 && (
            <View className="bg-indigo-600 rounded-full min-w-5 h-5 items-center justify-center px-1">
              <Text className="text-white text-xs font-bold">{totalItems}</Text>
            </View>
          )}
        </View>
      </View>

      <KeyboardAvoidingView className="flex-1" behavior="height">
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-4 py-4 pb-10"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
        {/* Products Section */}
        <Text className="text-base font-semibold text-gray-700 mb-3">
          Products
        </Text>
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* Cart Section */}
        {totalItems > 0 && (
          <View className="bg-white rounded-2xl p-4 mt-4 shadow-sm border border-gray-100">
            <Text className="text-base font-semibold text-gray-900 mb-1">
              Cart
            </Text>
            <Text className="text-xs text-gray-500 mb-3">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </Text>

            {cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}

            {/* Voucher */}
            <View className="mt-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Voucher Code
              </Text>
              <View className="flex-row gap-2">
                <TextInput
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 bg-gray-50"
                  placeholder="e.g. discount10"
                  placeholderTextColor="#9ca3af"
                  value={voucherCode}
                  onChangeText={setVoucherCode}
                  onSubmitEditing={applyVoucher}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={applyVoucher}
                  className="bg-indigo-600 px-4 rounded-xl items-center justify-center"
                >
                  <Text className="text-white text-sm font-semibold">Apply</Text>
                </TouchableOpacity>
              </View>
              {voucherStatus.isValid !== null && (
                <Text
                  className={`text-xs mt-1.5 font-medium ${
                    voucherStatus.isValid ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {voucherStatus.message}
                </Text>
              )}
            </View>

            {/* Totals */}
            <View className="mt-4 pt-3 border-t border-gray-100">
              <View className="flex-row justify-between mb-1.5">
                <Text className="text-sm text-gray-600">Subtotal</Text>
                <Text className="text-sm text-gray-900">
                  ₱{subtotal.toLocaleString()}
                </Text>
              </View>

              {discountApplied && (
                <View className="flex-row justify-between mb-1.5">
                  <Text className="text-sm text-green-600">Discount (10%)</Text>
                  <Text className="text-sm text-green-600">
                    −₱{discountAmount.toLocaleString()}
                  </Text>
                </View>
              )}

              <View className="flex-row justify-between mt-2 pt-2 border-t border-gray-200">
                <Text className="text-base font-bold text-gray-900">Total</Text>
                <Text className="text-base font-bold text-indigo-600">
                  ₱{finalTotal.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <ShopScreen />
      </CartProvider>
    </SafeAreaProvider>
  );
}
