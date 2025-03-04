import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all products
export const getAll = query({
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    return products.map((product) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category_id: product.category_id,
      stock_quantity: product.stock_quantity,
      created_at: product.created_at,
      updated_at: product.updated_at,
    }));
  },
});

// Get products by category
export const getByCategory = query({
  args: { categoryId: v.id("categories") },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category_id", args.categoryId))
      .collect();
    
    return products.map((product) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category_id: product.category_id,
      stock_quantity: product.stock_quantity,
      created_at: product.created_at,
      updated_at: product.updated_at,
    }));
  },
});

// Get a product by ID
export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product) return null;
    return {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category_id: product.category_id,
      stock_quantity: product.stock_quantity,
      created_at: product.created_at,
      updated_at: product.updated_at,
    };
  },
});

// Create a new product
export const create = mutation({
  args: {
    name: v.string(),
    price: v.number(),
    image: v.string(),
    description: v.string(),
    category_id: v.id("categories"),
    stock_quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("products", {
      name: args.name,
      price: args.price,
      image: args.image,
      description: args.description,
      category_id: args.category_id,
      stock_quantity: args.stock_quantity,
      created_at: now,
      updated_at: now,
    });
  },
});

// Update a product
export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.string(),
    price: v.number(),
    image: v.string(),
    description: v.string(),
    category_id: v.id("categories"),
    stock_quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    await ctx.db.patch(args.id, {
      name: args.name,
      price: args.price,
      image: args.image,
      description: args.description,
      category_id: args.category_id,
      stock_quantity: args.stock_quantity,
      updated_at: now,
    });
  },
});

// Delete a product
export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Update stock quantity
export const updateStock = mutation({
  args: {
    id: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product) throw new Error("Product not found");
    
    const now = new Date().toISOString();
    await ctx.db.patch(args.id, {
      stock_quantity: args.quantity,
      updated_at: now,
    });
  },
});