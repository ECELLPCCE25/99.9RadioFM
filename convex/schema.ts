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

    // Learning modules
  modules: defineTable({
    title: v.string(),
    description: v.string(),
    level: v.string(),
    xpReward: v.number(),
    order: v.number(),
    requiredModules: v.optional(v.array(v.id("modules"))),
  }).index("by_order", ["order"]),


moneySpent: defineTable({
    clerkId: v.string(),
    records: v.array(
        v.object({
            category: v.string(),
            date: v.string(),
            fullTimestamp: v.string(),
            moneyPaid: v.string(),
            to: v.string(),
        })
    ),
}).index("by_clerk_id", ["clerkId"]),


    groups: defineTable({
        id: v.string(),
        name: v.string(),
        description: v.string(),
        participants: v.array(v.object({
            id: v.string(),
            name: v.string(),
            email: v.string(),
            avatar: v.string(),
        })),
        messages: v.array(v.object({
            id: v.string(),
            content: v.string(),
            sender: v.object({
                id: v.string(),
                name: v.string(),
                avatar: v.string(),
            }),
            timestamp: v.number(),
        })),
    }).index("by_clerk_id", ["id"]),

    group_goals: defineTable({
        groupId: v.string(),
        goal: v.string(),
        end_date: v.string(),
        progress: v.number(),
    }).index("by_group_id", ["groupId"]),

    debts: defineTable({
        id: v.string(),
        debt: v.string(),
        end_date: v.string(),
        progress: v.number(),
    }).index("by_clerk_id", ["id"]),
});