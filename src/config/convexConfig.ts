import { ConvexProvider, useConvex } from 'convex/react';
import { ConvexReactClient } from 'convex/react-client';

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is not set");
}

const convex = new ConvexReactClient(convexUrl);

export { ConvexProvider, useConvex, convex };