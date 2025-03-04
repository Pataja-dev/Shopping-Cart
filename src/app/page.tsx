"use client"
import React, { useEffect } from 'react';
import ProductList from './UI/ProductList';
import Cart from './UI/Cart';
import {  Product } from './UI/Product';
import { fetchProductsFromDB } from '../services/databaseService';
import { CartProvider, useCart } from './CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Main />
    </CartProvider>
  );
};

const Main: React.FC = () => {
  const { state, dispatch } = useCart();
  const [products, setProducts] = React.useState<Product[]>(fetchProductsFromDB);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await fetchProductsFromDB();
        setProducts(fetchedProducts);
      } catch (error) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  const totalPrice = state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ProductList products={products} addToCart={addToCart} categories={[]} selectedCategory={null} onSelectCategory={() => {}} />
      <Cart
        cartItems={state.cart || []} // Ensure cartItems is always an array
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        totalPrice={totalPrice}
        checkout={() => dispatch({ type: 'REMOVE_ITEM', id: 0 })} // Placeholder for checkout action
        isLoggedIn={true}
      />
    </>
  );
};

export default App;