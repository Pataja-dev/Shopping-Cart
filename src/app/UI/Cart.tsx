
import React from 'react';
import CartItem from './CartItem';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

interface CartItemType {
  product: Product;
  quantity: number;
}

interface CartProps {
  cartItems: CartItemType[];  
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  totalPrice: number;
  checkout: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice, checkout }) => {
  // const cartItemization = useQuery(api.cart.getByUser)
  return (
    <div className="fixed right-0 top-0 w-[400px] h-full bg-white border-l border-gray-200 shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

      
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        ))
      )}
      <div className="flex justify-end items-center mt-8">
        <span className="text-gray-600 mr-4">Total Price: </span>
        <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <button onClick={checkout} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;