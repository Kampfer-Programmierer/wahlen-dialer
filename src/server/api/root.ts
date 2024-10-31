import { agentsRouter } from '~/server/api/routers/agent'; // Import the agents router
import { customersRouter } from '~/server/api/routers/customer'; // Import the customers router
import { campaignsRouter } from '~/server/api/routers/campaign'; // Import the campaigns router
import { callsRouter } from '~/server/api/routers/call'; // Import the calls router
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  agents: agentsRouter, // Add agent routes
  customers: customersRouter, // Add customer routes
  campaigns: campaignsRouter, // Add campaign routes
  calls: callsRouter, // Add call routes
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
