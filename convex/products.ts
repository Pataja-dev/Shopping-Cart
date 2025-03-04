import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all users (admin only)
export const getAll = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));
  },
});

// Get a user by ID
export const getById = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    if (!user) return null;
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  },
});

// Get a user by email (for login)
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
    
    if (users.length === 0) return null;
    const user = users[0];
    
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password, // In a real app, you'd compare hashed passwords on the server
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  },
});

// Create a new user (signup)
export const create = mutation({
  args: {
    username: v.string(),
    password: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // In a real app, hash the password here
    const now = new Date().toISOString();
    return await ctx.db.insert("users", {
      username: args.username,
      password: args.password, // Store hashed password in production
      email: args.email,
      created_at: now,
      updated_at: now,
    });
  },
});

// Update a user
export const update = mutation({
  args: {
    id: v.id("users"),
    username: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    await ctx.db.patch(args.id, {
      username: args.username,
      email: args.email,
      updated_at: now,
    });
  },
});

// Update password
export const updatePassword = mutation({
  args: {
    id: v.id("users"),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // In a real app, hash the password here
    const now = new Date().toISOString();
    await ctx.db.patch(args.id, {
      password: args.password, // Store hashed password in production
      updated_at: now,
    });
  },
});