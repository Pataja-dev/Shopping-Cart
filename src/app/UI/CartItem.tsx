import React from 'react';
import { Product } from './Product';

interface CartItemProps {
  item: { product: Product; quantity: number; id?: number };
  increaseQuantity: (cartItemId: number, productId: number) => void;
  decreaseQuantity: (cartItemId: number, productId: number) => void;
  removeFromCart: (cartItemId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  return (
    <div>
      <div className="mt-8">
        <div className="flex flex-col md:flex-row border-b border-gray-400 py-4">
          <div className="flex-shrink-0">
            <img src={item.product.image} alt="Product image" className="w-32 h-32 object-cover"/>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6">
            <h2 className="text-lg font-bold">{item.product.name}</h2>
            <div className="mt-4 flex items-center">
              <span className="mr-2 text-gray-600">Quantity:</span>
              <div className="flex items-center">
                <button 
                  className="bg-blue-300 rounded px-2 py-1" 
                  onClick={() => item.id && decreaseQuantity(item.id, item.product.id)}
                >
                  -
                </button>
                <span className="mx-2 text-gray-600">{item.quantity}</span>
                <button 
                  className="bg-blue-300 rounded px-2 py-1" 
                  onClick={() => item.id && increaseQuantity(item.id, item.product.id)}
                >
                  +
                </button>
              </div>
              <span className="ml-auto font-bold">Price: ₱{item.product.price.toFixed(2)}</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {item.product.stock_quantity <= 5 ? 
                <p className="text-red-500">Only {item.product.stock_quantity} left in stock!</p> : 
                <p>In stock: {item.product.stock_quantity}</p>
              }
            </div>
            <button 
              className='flex text-red-700 mt-3' 
              onClick={() => item.id && removeFromCart(item.id)}
            >
              Remove
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L3.772 5.79m16.456 0A48.108 48.108 0 0 1 12 5.25c-1.887 0-3.746.114-5.572.34m14.344.2L18.16 19.673m0-14.883a48.108 48.108 0 0 0-12.318-.34m0 0-.346 9m0-9c-.34-.059-.68-.114-1.022-.166m1.022.166L5.84 19.673m0-14.883c-.34-.059-.68-.114-1.022-.166m1.022.166L3.772 5.79" />
              </svg>
            </button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;