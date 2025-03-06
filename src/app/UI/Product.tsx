export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock_quantity: number;
}

// Initial product data 
export const initialProducts: Product[] = [
  {
    id: '1', name: 'NIKE V2K RUN', price: 10.0, image: '/images/NIKE+V2K+RUN.png',
    description: "",
    stock_quantity: 0
  },
  {
    id: '2', name: 'JORDAN ZION 4', price: 15.0, image: '/images/JORDAN+ZION+4+PF.png',
    description: "",
    stock_quantity: 0
  },
  {
    id: '3', name: 'BIG NIKE LOW', price: 20.0, image: '/images/BIG+NIKE+LOW.png',
    description: "",
    stock_quantity: 0
  },
  {
    id: '4', name: 'NIKE ZOOMX ULTRAFLY TRAIL', price: 20.0, image: '/images/NIKE+ZOOMX+ULTRAFLY+TRAIL.png',
    description: "",
    stock_quantity: 0
  },
  {
    id: '5', name: 'NIKE ZOOMX ULTRAFLY TRAIL', price: 20.0, image: '/images/NIKE+ZOOMX+ULTRAFLY+TRAIL.png',
    description: "",
    stock_quantity: 0
  },
  {
    id: '6', name: 'NIKE ZOOMX ULTRAFLY TRAIL', price: 20.0, image: '/images/NIKE+ZOOMX+ULTRAFLY+TRAIL.png',
    description: "",
    stock_quantity: 0
  },
];

