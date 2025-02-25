import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
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
                {/* <img src="https://picsum.photos/id/237/150/150" alt="Product image" className="w-32 h-32 object-cover"/> */}
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
                <h2 className="text-lg font-bold">{item.product.name}</h2>
                <div className="mt-4 flex items-center">
                    <span className="mr-2 text-gray-600">Quantity:</span>
                    <div className="flex items-center">
                    <button className="bg-gray-200 rounded-l-lg px-2 py-1" onClick={() => decreaseQuantity(item.product.id)}>-</button>
                        <span className="mx-2 text-gray-600">{item.quantity}</span>
                        <button className="bg-gray-200 rounded-l-lg px-2 py-1" onClick={() => increaseQuantity(item.product.id)}>+</button>
                    </div>
                    <span className="ml-auto font-bold">Price: ${item.product.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    </div>
      {/* <h4>{item.product.name}</h4>
      <p>Price: ${item.product.price.toFixed(2)}</p>
      <p>Quantity: {item.quantity}</p>
      <button className="bg-gray-200 rounded-l-lg px-2 py-1" onClick={() => increaseQuantity(item.product.id)}>+</button>
      <button className="bg-gray-200 rounded-l-lg px-2 py-1" onClick={() => decreaseQuantity(item.product.id)}>-</button>
      <button  onClick={() => removeFromCart(item.product.id)}>Remove</button> */}
      <div className="flex justify-end items-center mt-8">
        <span className="text-gray-600 mr-4">Subtotal:</span>
        <span className="text-xl font-bold">$35.00</span>
    </div>
    </div>
  );
};

export default CartItem;