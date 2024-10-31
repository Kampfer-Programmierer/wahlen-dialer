import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import Campaign from "~/app/models/Campaign"; // Import your Mongoose Campaign model

export const campaignsRouter = createTRPCRouter({
    // Get all campaigns
    getAll: publicProcedure.query(async () => {
        return await Campaign.find().populate('assignedAgents'); // Retrieves all campaigns and populates assigned agents
    }),

    // Create a new campaign
    createCampaign: protectedProcedure
        .input(z.object({
            name: z.string().min(1), // Name must be a non-empty string
            description: z.string().optional(), // Optional description
            assignedAgents: z.array(z.string()).optional(), // Optional array of agent IDs
            status: z.enum(['active', 'inactive']).optional(), // Optional status
        }))
        .mutation(async ({ ctx, input }) => {
            const campaign = new Campaign({
                name: input.name,
                description: input.description ?? '', // Default to empty string if not provided
                assignedAgents: input.assignedAgents ?? [], // Default to empty array if not provided
                status: input.status ?? 'active', // Default to 'active' if not provided
            });
            return await campaign.save(); // Saves the new campaign to the database
        }),

    // Get campaign by ID
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await Campaign.findById(input.id).populate('assignedAgents'); // Retrieves campaign by ID
        }),

    // Update a campaign
    updateCampaign: protectedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1).optional(), // Optional name update
            description: z.string().optional(), // Optional description update
            assignedAgents: z.array(z.string()).optional(), // Optional array of agent IDs update
            status: z.enum(['active', 'inactive']).optional(), // Optional status update
        }))
        .mutation(async ({ ctx, input }) => {
            const updateData: Partial<ICampaign> = {};
            if (input.name) updateData.name = input.name;
            if (input.description) updateData.description = input.description;
            if (input.assignedAgents) updateData.assignedAgents = input.assignedAgents;
            if (input.status) updateData.status = input.status;

            return await Campaign.findByIdAndUpdate(input.id, updateData, { new: true }).populate('assignedAgents'); // Updates the campaign and returns the updated document
        }),

    // Delete a campaign
    deleteCampaign: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await Campaign.findByIdAndDelete(input.id); // Deletes the campaign from the database
        }),
});
