import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Categories table
  categories: defineTable({
    name: v.string(),
    description: v.string(),
    created_at: v.string(),
    updated_at: v.string(),
  }),

  // Products table
  products: defineTable({
    name: v.string(),
    price: v.number(),
    image: v.string(),
    description: v.string(),
    category_id: v.id("categories"),
    stock_quantity: v.number(),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_category", ["category_id"]),

  // Users table
  users: defineTable({
    username: v.string(),
    password: v.string(), // Note: In production, store hashed passwords only
    email: v.string(),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_email", ["email"]),

  // Shopping Cart table
  cart: defineTable({
    user_id: v.id("users"),
    product_id: v.id("products"),
    quantity: v.number(),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_user", ["user_id"]),

  // Orders table
  orders: defineTable({
    user_id: v.id("users"),
    total_amount: v.number(),
    order_status: v.string(),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_user", ["user_id"]),

  // Order Items table
  orderItems: defineTable({
    order_id: v.id("orders"),
    product_id: v.id("products"),
    quantity: v.number(),
    price: v.number(),
    created_at: v.string(),
  }).index("by_order", ["order_id"]),
});