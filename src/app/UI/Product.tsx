export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock_quantity: number;
  created_at?: string;
  updated_at?: string;
}

// Fallback products in case database isn't loaded yet
export const fallbackProducts: Product[] = [
  { id: "1", name: 'NIKE V2K RUN', price: 10.0, image: '/images/NIKE+V2K+RUN.png', description: 'Stylish Nike V2K RUN sneakers', stock_quantity: 25 },
  { id: "2", name: 'JORDAN ZION 4', price: 15.0, image: '/images/JORDAN+ZION+4+PF.png', description: 'Signature Jordan Zion 4 shoes', stock_quantity: 15 },
  { id: "3", name: 'BIG NIKE LOW', price: 20.0, image: '/images/BIG+NIKE+LOW.png', description: 'Classic Big Nike Low design', stock_quantity: 30 },
  { id: "4", name: 'NIKE ZOOMX ULTRAFLY TRAIL', price: 20.0, image: '/images/NIKE+ZOOMX+ULTRAFLY+TRAIL.png', description: 'Performance trail running shoes', stock_quantity: 20 },
];