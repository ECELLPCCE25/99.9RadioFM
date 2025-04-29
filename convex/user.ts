import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get user by Clerk ID
export const getUserByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
        .first()
  
      if (!user) return null
  
      return { ...user}
    },
})

//create a user if it doesn't exist, or update the user if it does
export const createOrUpdateUser = mutation({
    args: {
      clerkId: v.string(),
      name: v.string(),
      email: v.string(),
    },
    handler: async (ctx, args) => {
      // Check if user exists
      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
        .first()
  
      if (existingUser) {
        // Update existing user
        return await ctx.db.patch(existingUser._id, {
          name: args.name,
          email: args.email,
        })
      } else {
        // Create new user with initial gamification data
        return await ctx.db.insert("users", {
          clerkId: args.clerkId,
          name: args.name,
          email: args.email,
          level: "Beginner",
          xp: 0,
          nextLevelXp: 500,
          completedModules: [],
          inProgressModules: [],
          createdAt: Date.now(),
          credit: 0,
          citypoints: 0,
          goals:{}
        })
      }
    },
})