"use client";
import React, { useState, useEffect, useReducer } from 'react';
import ProductList from '../../UI/ProductList';
import Cart from '../../UI/Cart';
import Header from '../../UI/Header';
import { useMutation, useQuery } from "convex/react";
import { Product } from '@/app/UI/Product';
import { api } from '../../../../convex/_generated/api';
import { Id } from "../../../../convex/_generated/dataModel";

const App: React.FC = () => {
    const storedUserId = localStorage.getItem("userId");
    const userId = storedUserId ? (storedUserId as Id<"users">) : null;
    
    const products = useQuery(api.products.getAllProducts) || [];
    const cartItems = useQuery(api.cart.getByUser, userId ? { userId } : "skip") || [];
    const addItemToCart = useMutation(api.cart.addItem);
    const removeItemFromCart = useMutation(api.cart.removeItem);
    const updateCartItem = useMutation(api.cart.updateQuantity);
    
    const [isCartOpen, setIsCartOpen] = useState(false);
  
    const addToCart = async (product: Product) => {
      if (!userId) {
        alert("User not found. Please log in.");
        return;
      }
      await addItemToCart({ userId, productId: product.id as Id<"products">, quantity: 1 });
    };
  
    const increaseQuantity = async (productId: string) => {
        const item = cartItems.find((item) => item.product.id === productId);
        if (item) {
          await updateCartItem({ 
            cartItemId: item.id as Id<"cart">,  // Use cart item ID instead of userId
            quantity: item.quantity + 1 
          });
        }
      };
      
      const decreaseQuantity = async (productId: string) => {
        const item = cartItems.find((item) => item.product.id === productId);
        if (item && item.quantity > 1) {
          await updateCartItem({ 
            cartItemId: item.id as Id<"cart">, // Use cart item ID
            quantity: item.quantity - 1 
          });
        } else if (item && item.quantity === 1) {
          await removeItemFromCart({ cartItemId: item.id as Id<"cart"> }); // Use cartItemId
        }
      };
      
      const removeFromCart = async (productId: string) => {
        const item = cartItems.find((item) => item.product.id === productId);
        if (item) {
          await removeItemFromCart({ cartItemId: item.id as Id<"cart"> }); // Use cartItemId
        }
      };
      
  
      const checkout = () => {
        cartItems.forEach(async (item) => {
          await removeItemFromCart({ cartItemId: item.id as Id<"cart"> });
        });
      };

    const [searchTerm, setSearchTerm] = useState<string>('');
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
    return (
      <>
        <div className='search-bar justify-items-center'>
          <button 
            type="button" 
            onClick={() => setIsCartOpen(prev => !prev)} 
            className="fixed bottom-4 right-4 bg-indigo-500 text-white py-2 px-4 rounded shadow-lg z-50"
          >
            {isCartOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            }
          </button>
          <input 
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}  
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
  
        <ProductList products={filteredProducts} addToCart={addToCart} />
  
        {isCartOpen && <Cart cartItems={cartItems} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} totalPrice={totalPrice} checkout={checkout} />}
      </>
    );
  };
  
  export default App;
  

