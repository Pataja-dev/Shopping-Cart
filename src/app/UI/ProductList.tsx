import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock_quantity: number;
}

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="w-full h-56 object-cover p-4 rounded-t-lg"
                src={product.image}
                alt={product.name}
              />
              <div className="px-5 pb-5">
                <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">{product.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ₱{product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Stock: {product.stock_quantity > 0 ? product.stock_quantity : 'Out of stock'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
