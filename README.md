# Kulay Mini Task — Add to Cart App

A React Native shopping app built with Expo as a technical assessment. Demonstrates React hooks, state management, and UI layout using NativeWind (Tailwind CSS).

## Features

- Browse 5 static products with name, description, and price
- Add products to cart with quantity controls (+ / −)
- Real-time cart item count badge in the header
- Cart summary showing all items, line totals, and grand total
- Voucher code support — enter `discount10` for 10% off
- Single-screen layout, no navigation required

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Expo SDK | 54 | App framework |
| React Native | 0.81.5 | Core UI |
| TypeScript | 5.9 | Type safety |
| NativeWind | 4.2.3 | Tailwind CSS for React Native |
| Tailwind CSS | 3 | Utility-first styling |
| EAS Build | — | Android APK generation |

## React Hooks Usage

| Hook | Location | Purpose |
|------|----------|---------|
| `useState` | `CartContext` | Cart items, voucher input, discount state |
| `useEffect` | `CartContext` | Logs cart count to console on every change |
| `useMemo` | `CartContext` | Derives `totalItems`, `subtotal`, `discountAmount`, `finalTotal` |
| `useContext` | `ProductCard`, `CartItem` | Consumes cart state without prop drilling |
| `useCallback` | `CartContext` | Stabilizes cart operation functions |
| Custom `useCart()` | `CartContext` | Encapsulates context access with provider guard |

## Project Structure

```
kulay-mini-task/
├── App.tsx                  # App entry point and main screen layout
├── global.css               # Tailwind CSS directives (NativeWind)
├── babel.config.js          # Babel config with NativeWind preset
├── metro.config.js          # Metro bundler config with NativeWind
├── tailwind.config.js       # Tailwind config with NativeWind preset
├── nativewind-env.d.ts      # className type declarations
├── eas.json                 # EAS Build profiles (APK + AAB)
├── components/
│   ├── ProductCard.tsx      # Product tile with add/qty controls
│   └── CartItem.tsx         # Cart row with line total and qty controls
├── context/
│   └── CartContext.tsx      # All cart state and logic (hooks live here)
├── data/
│   └── products.ts          # Static product data (5 products)
└── types/
    └── index.ts             # Product and CartItemType interfaces
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo Go app on your Android/iOS device, or an Android emulator

### Run Locally

```bash
# Install dependencies
npm install

# Start the dev server
npx expo start
```

Scan the QR code with Expo Go, or press `a` to open on a connected Android device/emulator.

## Building the APK

Requires a free [Expo account](https://expo.dev) and EAS CLI.

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to your Expo account
eas login

# Configure Android package name (first time only)
eas build:configure

# Build the APK
eas build -p android --profile preview
```

Once the build completes, download the `.apk` from the link provided in the terminal or from the [EAS dashboard](https://expo.dev).

## Voucher Code

| Code | Discount |
|------|----------|
| `discount10` | 10% off total |
