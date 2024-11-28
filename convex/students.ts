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

export const addDefaultStudents = mutation({
  args: {},
  handler: async (ctx) => {
    const defaultStudents = [
      { name: "❤️Sohana❤️", number: "+880 1326-503908" },
      { name: "Siam", number: "+880 1784-500561" },
      { name: "Mariam", number: "+880 1973-527437" },
      { name: "Nafi", number: "+880 1736-297983" },
      { name: "Sneha", number: "+880 1904-956638" },
      { name: "Adrita", number: "+880 1734-586797" },
      { name: "Shima", number: "+880 1405-032890" },
      { name: "Bristy", number: "+880 1935-010650" },
      { name: "Safid", number: "+880 1755-314877" },
      { name: "Pranto", number: "+880 1990-577854" },
      { name: "Jamil", number: "+880 1709-430398" },
      { name: "Ibrahim", number: "+880 1909-170677" },
      { name: "Bithy", number: "+880 1735-096051" },
    ];

    for (const student of defaultStudents) {
      await ctx.db.insert("students", student);
    }

    return "Default students added successfully";
  },
});
