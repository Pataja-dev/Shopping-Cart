import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all products
export const getAllProducts = query({
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    return products.map((product) => ({
      id: product._id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      stock_quantity: product.stock_quantity,
      created_at: product.created_at,
      updated_at: product.updated_at,
    }));
  },
});

// Get a product by ID
export const getProductById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product) return null;
    return {
      id: product._id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      stock_quantity: product.stock_quantity,
      created_at: product.created_at,
      updated_at: product.updated_at,
    };
  },
});

// Create a new product
export const createProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    image: v.string(),
    price: v.number(),
    stock_quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("products", {
      name: args.name,
      description: args.description,
      image: args.image,
      price: args.price,
      stock_quantity: args.stock_quantity,
      created_at: now,
      updated_at: now,
    });
  },
});

// Update a product
export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    name: v.string(),
    description: v.string(),
    image: v.string(),
    price: v.number(),
    stock_quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    await ctx.db.patch(args.id, {
      name: args.name,
      description: args.description,
      image: args.image,
      price: args.price,
      stock_quantity: args.stock_quantity,
      updated_at: now,
    });
  },
});

// Delete a product
export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});