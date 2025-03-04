import { query } from '../../convex/_generated/server';
import { Product } from '../app/UI/Product';

export const fetchProductsFromDB = query({
  handler: async (ctx) => {
    // Begin a query for the "products" table
    const products = await ctx.db.query('products').collect();

    // Map the fetched documents to the Product type
    return products.map((product: { _id: any; name: any; price: any; image: any; description: any; stock_quantity: any; created_at: any; updated_at: any; }) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      stock_quantity: product.stock_quantity,
      created_at: product.created_at,
      updated_at: product.updated_at
    }));
  }
});