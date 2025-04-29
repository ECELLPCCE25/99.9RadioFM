import { v } from "convex/values";
import {  mutation, query } from "./_generated/server";

//GET ALL MODULES
export const getModules = query({
  handler: async (ctx) => {
    const modules = await ctx.db.query("modules").collect();
    return modules.sort(() => Math.random() - Math.random());
  },
});

//create module
export const createModule = mutation({
  args: {
    title: v.string(),
        description: v.string(),
        level: v.string(),
        progress: v.number(),
  },
  handler: async (ctx, args) => {
    const moduleId = await ctx.db.insert("modules", {
      title: args.title,
      description: args.description,
      level: args.level,
      progress: args.progress,
    });
    return moduleId;
  },
});

//update module progress
export const updateProgress = mutation({
  args: {
    documentId: v.id("modules"), 
    progress: v.number(), 
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.documentId, { progress: args.progress });
    return await ctx.db.get(args.documentId);
  },
});
  