import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get user by Clerk ID
export const getGoalsOfGroup = query({
    args: { id: v.string() },
    handler: async (ctx, args) => {
      const goals = await ctx.db
        .query("group_goals")
        .withIndex("by_group_id", (q) => q.eq("groupId", args.id))
        .collect()
  
      if (!goals) return null
  
      return { ...goals}
    },
})

//create a user if it doesn't exist, or update the user if it does
export const createGroupGoal = mutation({
    args: {
      id: v.string(),
      goal: v.string(),
      end_date: v.string(),
      progress: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("group_goals", {
            groupId: args.id,
            goal: args.goal,
            end_date: args.end_date,
            progress: args.progress,
        })
    },
})

export const updateGoalProgress = mutation({
    args: {
      goalId: v.id("group_goals"),
      progress: v.number(),
    },
    handler: async (ctx, args) => {
      const { goalId, progress } = args;
      
      // Validate that the goal exists
      const existingGoal = await ctx.db.get(goalId);
      if (!existingGoal) {
        throw new Error("Goal not found");
      }
      
      // Update the progress field
      await ctx.db.patch(goalId, { progress });
      
      return { success: true };
    },
  });