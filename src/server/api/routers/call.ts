import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import Call from "~/app/models/Call"; // Import your Mongoose Call model

export const callsRouter = createTRPCRouter({
    // Get all calls
    getAll: publicProcedure.query(async ({ ctx }) => {
        return await Call.find().populate('agent campaign customer'); // Populating references for more detailed data
    }),

    // Log a new call
    logCall: protectedProcedure
        .input(z.object({
            agentId: z.string(), // Expecting agent ID as input
            campaignId: z.string(), // Expecting campaign ID as input
            customerId: z.string(), // Expecting customer ID as input
            duration: z.number().min(0), // Duration must be a non-negative number
            status: z.enum(['completed', 'in-progress', 'failed']), // Status must be one of the defined enums
        }))
        .mutation(async ({ ctx, input }) => {
            const call = new Call({
                agent: input.agentId,
                campaign: input.campaignId,
                customer: input.customerId,
                duration: input.duration,
                status: input.status,
            });
            return await call.save();
        }),

    // Get call by ID
    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await Call.findById(input.id).populate('agent campaign customer');
        }),

    // Update call log
    update: protectedProcedure
        .input(z.object({
            id: z.string(),
            duration: z.number().min(0),
            status: z.enum(['completed', 'in-progress', 'failed']),
        }))
        .mutation(async ({ ctx, input }) => {
            return await Call.findByIdAndUpdate(input.id, {
                duration: input.duration,
                status: input.status,
            }, { new: true });
        }),

    // Delete a call log
    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await Call.findByIdAndDelete(input.id);
        }),
});
