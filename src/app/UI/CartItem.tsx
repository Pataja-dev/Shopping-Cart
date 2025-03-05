
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

interface CartItemProps {
  item: { product: Product; quantity: number };
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  return (
    <div>
        <div className="mt-8">
            <div className="flex flex-col md:flex-row border-b border-gray-400 py-4">
                <div className="flex-shrink-0">
                    <img src={item.product.img} alt="Product image" className="w-32 h-32 object-cover"/>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                    <h2 className="text-lg font-bold">{item.product.name}</h2>
                    <div className="mt-4 flex items-center">
                        <span className="mr-2 text-gray-600">Quantity:</span>
                        <div className="flex items-center">
                            <button className="bg-blue-300 rounded px-2 py-1" onClick={() => decreaseQuantity(item.product.id)}>-</button>
                            <span className="mx-2 text-gray-600">{item.quantity}</span>
                            <button className="bg-blue-300 rounded px-2 py-1" onClick={() => increaseQuantity(item.product.id)}>+</button>
                        </div>
                        <span className="ml-auto font-bold">Price: ₱{item.product.price.toFixed(2)}</span>
                    </div>
                    <button className='flex text-red-700 mt-3' onClick={() => removeFromCart(item.product.id)}>Remove<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    </button> 
                </div>
            </div>
        </div>
    </div>
  );
};

export default CartItem;