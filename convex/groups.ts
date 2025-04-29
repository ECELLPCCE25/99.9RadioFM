import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get user by Clerk ID
export const getGroupById = query({
    args: { id: v.string() },
    handler: async (ctx, args) => {
      const user = await ctx.db
        .query("groups")
        .withIndex("by_clerk_id", (q) => q.eq("id", args.id))
        .first()
  
      if (!user) return null
  
      return { ...user}
    },
})

//create a user if it doesn't exist, or update the user if it does
export const createGroup = mutation({
    args: {
      id: v.string(),
      name: v.string(),
      email: v.string(),
      description: v.string(),
      uid: v.string(),
      uname: v.string(),
      avatar: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("groups", {
            id: args.id,
            name: args.name,
            description: args.description,
            participants: [
                {
                    id: args.uid,
                    name: args.uname,
                    email: args.email,
                    avatar: args.avatar,
                },
            ],
            messages: [],
        })
    },
})

export const postMessage = mutation({
    args: {
      groupId: v.string(),
      content: v.string(),
      sender: v.object({
        id: v.string(),
        name: v.string(),
        avatar: v.string(),
      }),
    },
    handler: async (ctx, args) => {
      // Find the group by its id using the index
      const group = await ctx.db
        .query("groups")
        .withIndex("by_clerk_id", (q) => q.eq("id", args.groupId))
        .unique();
      
      if (!group) {
        throw new Error("Group not found");
      }
      
      // Create a new message object
      const newMessage = {
        id: crypto.randomUUID(), // Generate a unique ID for the message
        content: args.content,
        sender: args.sender,
        timestamp: Date.now(),
      };
      
      // Update the group with the new message
      await ctx.db.patch(group._id, {
        messages: [...(group.messages || []), newMessage],
      });
      
      return newMessage;
    },
  });


export const getAllGroups = query({
  args: {},
  handler: async (ctx) => {
    const groups = await ctx.db.query("groups").collect();
    return groups;
  },
});