import { Keyboard } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartItemType, Product } from "../types";

interface VoucherStatus {
  message: string;
  isValid: boolean | null;
}

interface CartContextValue {
  cartItems: CartItemType[];
  voucherCode: string;
  discountApplied: boolean;
  voucherStatus: VoucherStatus;
  totalItems: number;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  setVoucherCode: (code: string) => void;
  applyVoucher: () => void;
  getQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [voucherCode, setVoucherCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [voucherStatus, setVoucherStatus] = useState<VoucherStatus>({
    message: "",
    isValid: null,
  });

  // useEffect: log cart item count whenever cart changes
  useEffect(() => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    console.log(`[Cart] ${count} item(s) in cart`);
  }, [cartItems]);

  // useMemo: derive totals — avoids recomputing on unrelated re-renders
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );

  const discountAmount = useMemo(
    () => (discountApplied ? Math.round(subtotal * 0.1) : 0),
    [subtotal, discountApplied]
  );

  const finalTotal = useMemo(
    () => subtotal - discountAmount,
    [subtotal, discountAmount]
  );

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  }, []);

  const applyVoucher = useCallback(() => {
    Keyboard.dismiss();
    if (voucherCode.trim() === "discount10") {
      setDiscountApplied(true);
      setVoucherStatus({ message: "10% discount applied!", isValid: true });
    } else {
      setDiscountApplied(false);
      setVoucherStatus({ message: "Invalid voucher code.", isValid: false });
    }
  }, [voucherCode]);

  const getQuantity = useCallback(
    (productId: string) =>
      cartItems.find((item) => item.product.id === productId)?.quantity ?? 0,
    [cartItems]
  );

  const value: CartContextValue = {
    cartItems,
    voucherCode,
    discountApplied,
    voucherStatus,
    totalItems,
    subtotal,
    discountAmount,
    finalTotal,
    addToCart,
    removeFromCart,
    setVoucherCode,
    applyVoucher,
    getQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
