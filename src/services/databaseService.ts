import { Product } from '../app/UI/Product';

// Mock function to simulate fetching products from a database
export const fetchProductsFromDB = async (): Promise<Product[]> => {
  // Simulating a delay for database fetch
  return new Promise((resolve) => {
    setTimeout(() => {
      const products: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          price: 100,
          image: 'https://via.placeholder.com/150',
          description: 'Description of Product 1',
          stock_quantity: 10,
        },
        {
          id: 2,
          name: 'Product 2',
          price: 200,
          image: 'https://via.placeholder.com/150',
          description: 'Description of Product 2',
          stock_quantity: 5,
        },
        // Add more products as needed
      ];
      resolve(products);
    }, 1000);
  });
};