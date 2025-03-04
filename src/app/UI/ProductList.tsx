import React from 'react';
import { Product } from './Product';

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
  categories: { id: string; name: string }[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  addToCart, 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => onSelectCategory(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              selectedCategory === null 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button 
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                selectedCategory === category.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Products</h2>
      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="relative pb-[100%] overflow-hidden rounded-t-lg">
                <img 
                  className="absolute top-0 left-0 w-full h-full object-cover p-4" 
                  src={product.image} 
                  alt={product.name} 
                />
              </div>
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                
                <div className="mt-2 mb-4">
                  {product.stock_quantity <= 5 ? (
                    <span className="text-sm font-medium text-red-500">Only {product.stock_quantity} left!</span>
                  ) : (
                    <span className="text-sm font-medium text-green-600">In Stock</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">₱{product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    disabled={product.stock_quantity === 0}
                    className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                      product.stock_quantity === 0
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }`}
                  >
                    {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;