import { ConvexProvider, ConvexReactClient } from "convex/react";

// Create a client
export const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);