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
        { 
          id: 3, 
          name: 'NIKE V2K RUN', 
          price: 10.0, 
          image: '/images/NIKE+V2K+RUN.png', 
          description: 'Stylish Nike V2K RUN sneakers', 
          stock_quantity: 25 
        },
        { 
          id: 4, 
          name: 'JORDAN ZION 4', 
          price: 15.0, 
          image: '/images/JORDAN+ZION+4+PF.png', 
          description: 'Signature Jordan Zion 4 shoes', 
          stock_quantity: 15 
        },
        { 
          id: 5, 
          name: 'BIG NIKE LOW', 
          price: 20.0, 
          image: '/images/BIG+NIKE+LOW.png', 
          description: 'Classic Big Nike Low design', 
          stock_quantity: 30 
        },
        { 
          id: 6, 
          name: 'NIKE ZOOMX ULTRAFLY TRAIL', 
          price: 20.0, 
          image: '/images/NIKE+ZOOMX+ULTRAFLY+TRAIL.png', 
          description: 'Performance trail running shoes', 
          stock_quantity: 20 
        },
        // Add more products as needed
      ];
      resolve(products);
    }, 1000);
  });
};