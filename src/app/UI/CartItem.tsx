import React from 'react';
import { Product } from './Product';

interface CartItemProps {
  item: { product: Product; quantity: number; id: number };
  increaseQuantity: (cartItemId: number) => void;
  decreaseQuantity: (cartItemId: number) => void;
  removeFromCart: (cartItemId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row border-b border-gray-400 py-4">
        <div className="flex-shrink-0">
          <img src={item.product.image} alt="Product image" className="w-32 h-32 object-cover"/>
        </div>
        <div className="flex-grow md:ml-4">
          <h3 className="text-lg font-semibold">{item.product.name}</h3>
          <p className="text-gray-600">₱{item.product.price.toFixed(2)} x {item.quantity}</p>
          <div className="flex items-center mt-2">
            <button onClick={() => decreaseQuantity(item.id)} className="bg-green-500 text-white px-2 py-1 rounded">-</button>
            <span className="mx-2">{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">+</button>
            <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-600">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;