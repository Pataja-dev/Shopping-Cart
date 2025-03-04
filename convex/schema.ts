import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Products table
  products: defineTable({
    name: v.string(),
    price: v.number(),
    image: v.string(),
    description: v.string(),
    stock_quantity: v.number(),
    created_at: v.string(),
    updated_at: v.string(),
  }),

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
});