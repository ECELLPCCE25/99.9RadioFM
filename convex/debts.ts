import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get user by Clerk ID
export const getDebtsofUser = query({
    args: { id: v.string() },
    handler: async (ctx, args) => {
      const goals = await ctx.db
        .query("debts")
        .withIndex("by_clerk_id", (q) => q.eq("id", args.id))
        .collect()
  
      if (!goals) return null
  
      return { ...goals}
    },
})

//create a user if it doesn't exist, or update the user if it does
export const createDebt = mutation({
    args: {
      id: v.string(),
      debt: v.string(),
      end_date: v.string(),
      progress: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("debts", {
            id: args.id,
            debt: args.debt,
            end_date: args.end_date,
            progress: args.progress,
        })
    },
})

export const updateDebtProgress = mutation({
    args: {
      debtId: v.id("debts"),
      progress: v.number(),
    },
    handler: async (ctx, args) => {
      const { debtId, progress } = args;
      
      // Validate that the goal exists
      const existingGoal = await ctx.db.get(debtId);
      if (!existingGoal) {
        throw new Error("Debt not found");
      }
      
      // Update the progress field
      await ctx.db.patch(debtId, { progress });
      
      return { success: true };
    },
  });