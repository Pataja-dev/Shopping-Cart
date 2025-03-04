import { ConvexProvider, ConvexReactClient } from "convex/react";

// Get the Convex URL from the environment variable or throw an error if it's not set
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is not set");
}

// Create a client
export const convex = new ConvexReactClient(convexUrl);