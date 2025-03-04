import React from 'react';
import CartItem from './CartItem';
import { Product } from './Product';

interface CartItemType {
  id: number;
  product: Product;
  quantity: number;
}

interface CartProps {
  cartItems: CartItemType[];
  increaseQuantity: (cartItemId: number) => void;
  decreaseQuantity: (cartItemId: number) => void;
  removeFromCart: (cartItemId: number) => void;
  totalPrice: number;
  checkout: () => void;
  isLoggedIn: boolean;
}

const Cart: React.FC<CartProps> = ({ cartItems, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice, checkout, isLoggedIn }) => {
  return (
    <div className="fixed right-0 top-0 w-[400px] h-full bg-white border-l border-gray-200 shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

      {!isLoggedIn && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
          <p>Please login to save your cart</p>
        </div>
      )}

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        ))
      )}
      <div className="flex justify-end items-center mt-8">
        <span className="text-gray-600 mr-4">Total Price: </span>
        <span className="text-xl font-bold">₱{totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={checkout}
          disabled={cartItems.length === 0}
          className={`w-full py-2 px-4 rounded font-bold text-white ${
            cartItems.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-500 hover:bg-indigo-700'
          }`}
        >
          Checkout
        </button>
        {!isLoggedIn && (
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login to Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;