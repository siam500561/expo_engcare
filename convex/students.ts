import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("students").collect();
  },
});

export const set = mutation({
  args: {
    name: v.string(),
    number: v.string(),
  },
  handler: async (ctx, args) => {
    const { name, number } = args;
    return ctx.db.insert("students", {
      name,
      number,
    });
  },
});
