import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    level: v.string(),
    xp: v.number(),
    nextLevelXp: v.number(),
    completedModules: v.array(v.string()),
    inProgressModules: v.array(v.string()),
    createdAt: v.number(),
    citypoints: v.number(),
    credit: v.number(),
    goals: v.object({
        longTerm: v.optional( v.object({
            name: v.string(),
            description: v.string(),
            target: v.number(),
            current: v.number(),
        })),
        shortTerm:v.optional( v.object({
            name: v.string(),
            description: v.string(),
            target: v.number(),
            current: v.number(),
        })),
    }),
    }).index("by_clerk_id", ["clerkId"]),
});