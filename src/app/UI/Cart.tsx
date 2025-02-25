import React from 'react';
import CartItem from './CartItem';

interface Product {
  id: number;
  name: string;
  price: number;
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
  return (
    <div>
      <h2>Shopping Cart</h2>
      
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
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      {/* <button onClick={checkout}>Checkout</button> */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            {/* <h1 className="text-2xl font-bold my-4">Shopping Cart</h1> */}
            <button onClick={checkout} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                Checkout
            </button>
        </div>
        {/* <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
            <button onClick={checkout} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                Checkout
            </button> */}
        </div>
  );
};

export default Cart;