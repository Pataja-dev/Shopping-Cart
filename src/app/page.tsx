// App.tsx
"use client"
import React, { useState, useEffect } from 'react';
import ProductList from './UI/ProductList';
import Cart from './UI/Cart';
import { fallbackProducts, Product } from './UI/Product';
import { fetchProductsFromDB } from '../services/databaseService';
import { CartProvider, useCart } from './CartContext';
import { api } from '../../convex/_generated/api';
import { useQuery } from 'convex/react';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Main />
    </CartProvider>
  );
};

const Main: React.FC = () => {
  const { state, dispatch } = useCart();
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', product });
  };

  const increaseQuantity = (id: number) => {
    dispatch({ type: 'INCREASE_QUANTITY', id });
  };

  const decreaseQuantity = (id: number) => {
    dispatch({ type: 'DECREASE_QUANTITY', id });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const checkout = () => {
    dispatch({ type: 'CHECKOUT' });
  };

  const totalPrice = state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className='search-bar justify-items-center'>
        <ProductList products={products} addToCart={addToCart} categories={[]} selectedCategory={null} onSelectCategory={() => {}} />
        <Cart
          cartItems={state.cart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
          totalPrice={totalPrice}
          checkout={checkout}
          isLoggedIn={true}
        />
      </div>
    </>
  );
};

export default App;