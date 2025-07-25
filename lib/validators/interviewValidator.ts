import { z } from "zod";

export const interviewValidator = z.object({
  companyWebsite: z.string().min(4, { message: "company website is required" }),
  totalQuestions: z.coerce
    .number()
    .min(1, { message: "questions must be above 0" })
    .max(10, { message: "questions must be below 10" }),
  type: z.enum(["behavioral", "technical", "mixed"]),
  level: z.enum(["junior", "mid", "senior", "lead", "intern"]),
});
