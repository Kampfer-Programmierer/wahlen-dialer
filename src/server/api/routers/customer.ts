import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import Customer from "~/app/models/Customer"; // Import your Mongoose Customer model

export const customersRouter = createTRPCRouter({
    // Get all customers
    getAll: publicProcedure.query(async () => {
        return await Customer.find().populate('assignedCampaigns'); // Retrieves all customers and populates assigned campaigns
    }),

    // Create a new customer
    createCustomer: protectedProcedure
        .input(z.object({
            name: z.string().min(1), // Name must be a non-empty string
            phoneNumber: z.string().min(1), // Phone number must be a non-empty string
            email: z.string().email(), // Email must be a valid email
            address: z.string().optional(), // Optional address
            assignedCampaigns: z.array(z.string()).optional(), // Optional array of campaign IDs
        }))
        .mutation(async ({ ctx, input }) => {
            const customer = new Customer({
                name: input.name,
                phoneNumber: input.phoneNumber,
                email: input.email,
                address: input.address ?? '', // Default to empty string if not provided
                assignedCampaigns: input.assignedCampaigns ?? [], // Default to empty array if not provided
            });
            return await customer.save(); // Saves the new customer to the database
        }),

    // Get customer by ID
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await Customer.findById(input.id).populate('assignedCampaigns'); // Retrieves customer by ID
        }),

    // Update a customer
    updateCustomer: protectedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1).optional(), // Optional name update
            phoneNumber: z.string().optional(), // Optional phone number update
            email: z.string().email().optional(), // Optional email update
            address: z.string().optional(), // Optional address update
            assignedCampaigns: z.array(z.string()).optional(), // Optional array of campaign IDs update
        }))
        .mutation(async ({ ctx, input }) => {
            const updateData: Partial<ICustomer> = {};
            if (input.name) updateData.name = input.name;
            if (input.phoneNumber) updateData.phoneNumber = input.phoneNumber;
            if (input.email) updateData.email = input.email;
            if (input.address) updateData.address = input.address;
            if (input.assignedCampaigns) updateData.assignedCampaigns = input.assignedCampaigns;

            return await Customer.findByIdAndUpdate(input.id, updateData, { new: true }).populate('assignedCampaigns'); // Updates the customer and returns the updated document
        }),

    // Delete a customer
    deleteCustomer: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await Customer.findByIdAndDelete(input.id); // Deletes the customer from the database
        }),
});
