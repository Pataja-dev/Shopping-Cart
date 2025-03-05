// CartContext.tsx
import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { Product } from './UI/Product';

interface CartItem {
  product: Product;
  quantity: number;
  id: number;
}

interface CartState {
  cart: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'INCREASE_QUANTITY'; id: number }
  | { type: 'DECREASE_QUANTITY'; id: number }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'CHECKOUT' }
  | { type: 'SYNC_CART'; cart: CartItem[] }; 

const initialState: CartState = {
  cart: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({ state: initialState, dispatch: () => null });

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.cart.find(item => item.product.id === action.product.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { product: action.product, quantity: 1, id: Date.now() }] };

    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
        ),
      };

    case 'REMOVE_ITEM':
      return { ...state, cart: state.cart.filter(item => item.id !== action.id) };

    case 'CHECKOUT':
      return { ...state, cart: [] }; // Clear the cart on checkout

    case 'SYNC_CART':
      return { ...state, cart: action.cart }; // Sync the cart with the provided cart items

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);