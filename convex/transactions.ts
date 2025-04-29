import { v } from "convex/values"
import { mutation } from "./_generated/server"


//get all transactions of one user
export const getTransactions = mutation({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
      const transactions = await ctx.db
        .query("moneySpent")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
        .first()
  
      if (!transactions) return null
  
      return { ...transactions}
    },
})

//create data
export const createTransaction = mutation({
  args: {
    clerkId: v.string(),
    record: v.array(
      v.object({
        category: v.string(),
        date: v.string(),
        fullTimestamp: v.string(),
        moneyPaid: v.string(),
        to: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const transaction = {
      clerkId: args.clerkId,
      records: args.record,
    };
    await ctx.db.insert("moneySpent", transaction);
    return transaction;
  },
});