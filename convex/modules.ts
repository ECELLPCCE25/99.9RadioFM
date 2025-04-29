import { v } from "convex/values";
import {  query } from "./_generated/server";

//GET ALL MODULES
export const getModules = query({
  handler: async (ctx) => {
    return await ctx.db.query("modules").collect();
  },
});

// Get module with lessons and quiz
export const getModuleWithContent = query({
  args: { moduleId: v.id("modules") },
  handler: async (ctx, args) => {
    const modules = await ctx.db.get(args.moduleId);
    if (!modules) return null;

    return modules;
  },
});


  