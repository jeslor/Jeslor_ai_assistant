import { z } from "zod";

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem-Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural & Role Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence & Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Leadership Ability"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Adaptability & Learning Agility"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Team Collaboration Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Emotional Intelligence"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Initiative and Proactiveness"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Creativity and Innovation Thinking"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Resilience and Handling Feedback"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Attention to Detail"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});
