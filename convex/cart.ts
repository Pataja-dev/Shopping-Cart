import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get cart items for a user
export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("user_id", args.userId))
      .collect();
    
    const itemsWithDetails = await Promise.all(
      cartItems.map(async (item) => {
        const product = await ctx.db.get(item.product_id);

        if (!product) {
          // Handle the case where product is null
          console.error('Product is null for item:', item);
          return null;
        }

        return {
          id: item._id,
          product: {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
          },
          quantity: item.quantity,
          created_at: item.created_at,
          updated_at: item.updated_at,
        };
      })
    );
    
    // Filter out any items that are null due to missing products
    return itemsWithDetails.filter(item => item !== null);
  },
});

// Add item to cart
export const addItem = mutation({
  args: {
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if item already exists in cart
    const existing = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("user_id", args.userId))
      .filter((q) => q.eq(q.field("product_id"), args.productId))
      .first();
    
    const now = new Date().toISOString();
    
    if (existing) {
      // Update quantity
      await ctx.db.patch(existing._id, {
        quantity: existing.quantity + args.quantity,
        updated_at: now,
      });
      return existing._id;
    } else {
      // Add new item
      return await ctx.db.insert("cart", {
        user_id: args.userId,
        product_id: args.productId,
        quantity: args.quantity,
        created_at: now,
        updated_at: now,
      });
    }
  },
});

// Update cart item quantity
export const updateQuantity = mutation({
  args: {
    cartItemId: v.id("cart"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    await ctx.db.patch(args.cartItemId, {
      quantity: args.quantity,
      updated_at: now,
    });
  },
});

// Remove item from cart
export const removeItem = mutation({
  args: { cartItemId: v.id("cart") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.cartItemId);
  },
});

// Clear cart (after checkout)
export const clearCart = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("user_id", args.userId))
      .collect();
    
    await Promise.all(
      cartItems.map(async (item) => {
        await ctx.db.delete(item._id);
      })
    );
  },
});