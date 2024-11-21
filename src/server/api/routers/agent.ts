import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import Agents from "~/app/models/Agents"; // Import your Mongoose Agent model

export const agentsRouter = createTRPCRouter({
    // Get all agents
    getAll: publicProcedure.query(async () => {
        return await Agents.find(); // Retrieves all agents from the database
    }),

    // Create a new agent
    createAgent: protectedProcedure
        .input(z.object({
            name: z.string().min(1), // Name must be a non-empty string
            employeeId: z.string().min(1), // Employee ID must be a non-empty string
            phoneNumber: z.string().min(1), // Phone number must be a non-empty string
            email: z.string().email(), // Email must be a valid email format
            roleId: z.string(), // Expecting role ID as input
            status: z.enum(['active', 'inactive', 'on-leave', 'on-call']).optional(), // Status is optional and must be one of the defined enums
        }))
        .mutation(async ({ ctx, input }) => {
            const agent = new Agents({
                name: input.name,
                employeeId: input.employeeId,
                phoneNumber: input.phoneNumber,
                email: input.email,
                role: input.roleId,
                status: input.status ?? 'active', // Default to 'active' if not provided
            });
            return await agent.save(); // Saves the new agent to the database
        }),

    // Get agent by ID
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await Agents.findById(input.id); // Retrieves agent by ID
        }),

    // Update an agent
    updateAgent: protectedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1).optional(), // Optional name update
            employeeId: z.string().optional(), // Optional employee ID update
            phoneNumber: z.string().optional(), // Optional phone number update
            email: z.string().email().optional(), // Optional email update
            roleId: z.string().optional(), // Optional role ID update
            status: z.enum(['active', 'inactive', 'on-leave', 'on-call']).optional(), // Optional status update
        }))
        .mutation(async ({ ctx, input }) => {
            const updateData: Partial<IAgent> = {};
            if (input.name) updateData.name = input.name;
            if (input.employeeId) updateData.employeeId = input.employeeId;
            if (input.phoneNumber) updateData.phoneNumber = input.phoneNumber;
            if (input.email) updateData.email = input.email;
            if (input.roleId) updateData.role = input.roleId;
            if (input.status) updateData.status = input.status;

            return await Agents.findByIdAndUpdate(input.id, updateData, { new: true }); // Updates the agent and returns the updated document
        }),

    // Delete an agent
    deleteAgent: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await Agents.findByIdAndDelete(input.id); // Deletes the agent from the database
        }),
});
