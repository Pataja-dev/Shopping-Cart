"use client"
import React, { useState, useEffect, useReducer } from 'react';
import ProductList from './UI/ProductList';
import Cart from './UI/Cart';
import { initialProducts, Product } from './UI/Product';


const App: React.FC = () => {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  type CartItem = {
    product: Product;
    quantity: number;
  };
  
  type CartState = CartItem[];
  
  type CartAction = 
    | { type: 'ADD_QUANTITY'; productId: number }
    | { type: 'SUBTRACT_QUANTITY'; productId: number };
  
  const quantityReducer = (state: CartState, { type, productId }: CartAction): CartState => 
    state.map(item => {
      if (item.product.id === productId) {
        const newQuantity = type === 'ADD_QUANTITY' ? item.quantity + 1 : Math.max(0, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  
  const [_, dispatch] = useReducer(quantityReducer, cart);
  
  const updateQuantity = (productId: number, isIncreasing: boolean) => {
    dispatch({ type: isIncreasing ? 'ADD_QUANTITY' : 'SUBTRACT_QUANTITY', productId });
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: Math.max(1, isIncreasing ? item.quantity + 1 : item.quantity - 1) } 
          : item
      )
    );
  };
  
  const increaseQuantity = (productId: number) => updateQuantity(productId, true);
  const decreaseQuantity = (productId: number) => updateQuantity(productId, false);

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const checkout = () => {
    setCart([]);
  };

  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <>
  <div className='search-bar  justify-items-center'>
    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="max-w-full md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200  rounded-lg text-sm p-2.5 me-1">
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <span className="sr-only">Search</span>
    </button>
    <div className="relative hidden md:block">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search icon</span>
      </div>
      <input type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}  
        id="search-navbar" 
        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
    </div>
  <div>

  </div>
  <div className='mr-[400px]'>

      <ProductList products={filteredProducts} addToCart={addToCart} />
      </div>
      <div>

      <Cart
        cartItems={cart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        totalPrice={totalPrice}
        checkout={checkout}
      />
      </div>
    </div>
    </>
  );
};

export default App;