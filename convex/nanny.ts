import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveMenu = mutation({
  args: {
    sessionId: v.string(),
    title: v.string(),
    eventType: v.string(),
    guestCount: v.number(),
    menuJson: v.string(),
    mockMode: v.boolean(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("nannyMenus", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const listMenus = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("nannyMenus")
      .withIndex("bySession", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .take(20);
  },
});

export const saveEvent = mutation({
  args: {
    sessionId: v.string(),
    title: v.string(),
    eventType: v.string(),
    guestCount: v.number(),
    planJson: v.string(),
    mockMode: v.boolean(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("nannyEvents", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const listEvents = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("nannyEvents")
      .withIndex("bySession", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .take(20);
  },
});

export const saveBrandConfig = mutation({
  args: {
    sessionId: v.string(),
    configJson: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("nannyBrandConfig")
      .withIndex("bySession", (q) => q.eq("sessionId", args.sessionId))
      .first();

    if (existing) {
      await ctx.db.patch("nannyBrandConfig", existing._id, { configJson: args.configJson, updatedAt: Date.now() });
      return existing._id;
    }
    return ctx.db.insert("nannyBrandConfig", {
      ...args,
      updatedAt: Date.now(),
    });
  },
});

export const getBrandConfig = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("nannyBrandConfig")
      .withIndex("bySession", (q) => q.eq("sessionId", args.sessionId))
      .first();
  },
});


export const submitPublicLead = mutation({
  args: {
    leadType: v.union(v.literal("worksite"), v.literal("event"), v.literal("popup"), v.literal("general")),
    organization: v.optional(v.string()),
    contactName: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    location: v.string(),
    headCount: v.optional(v.number()),
    serviceDate: v.optional(v.string()),
    serviceWindow: v.optional(v.string()),
    notes: v.optional(v.string()),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    const hasEmail = Boolean(args.email?.trim());
    const hasPhone = Boolean(args.phone?.trim());
    if (!hasEmail && !hasPhone) {
      throw new Error("Add an email or phone number so we know how to reach you.");
    }
    if (args.headCount !== undefined && (!Number.isInteger(args.headCount) || args.headCount < 1 || args.headCount > 5000)) {
      throw new Error("Crew size must be between 1 and 5000.");
    }

    return ctx.db.insert("nannyPublicLeads", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
  },
});
