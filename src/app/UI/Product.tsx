export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

// Initial product data 
export const initialProducts: Product[] = [
  { id: 1, name: 'NIKE V2K RUN', price: 10.0, img: '/images/NIKE+V2K+RUN.png' },
  { id: 2, name: 'JORDAN ZION 4', price: 15.0, img: '/images/JORDAN+ZION+4+PF.png' },
  { id: 3, name: 'BIG NIKE LOW', price: 20.0, img: '/images/BIG+NIKE+LOW.png' },
  { id: 4, name: 'NIKE ZOOMX ULTRAFLY TRAIL', price: 20.0, img: '/images/NIKE+ZOOMX+ULTRAFLY+TRAIL.png' },
  { id: 5, name: 'NIKE ZOOMX ULTRAFLY TRAIL', price: 20.0, img: '/images/NIKE+ZOOMX+ULTRAFLY+TRAIL.png' },
  { id: 6, name: 'NIKE ZOOMX ULTRAFLY TRAIL', price: 20.0, img: '/images/NIKE+ZOOMX+ULTRAFLY+TRAIL.png' },
];

