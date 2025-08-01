"use server";
import prisma from "@/lib/prisma/prisma";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { feedbackSchema } from "../validators/feedback.validator";

export const saveFeedBack = async ({ chats, interviewId, userId }: any) => {
  try {
    const transformedScript = chats
      .map(
        (sentence: { role: string; content: string }) =>
          `-${sentence.role}: ${sentence.content} \n`
      )
      .join("");

    const {
      object: {
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
      },
    } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer agent analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${transformedScript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills: Clarity, articulation, structured responses.
        - **Technical Knowledge: Understanding of key concepts for the role.
        - **Problem-Solving: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit: Alignment with company values and job role.
        - **Confidence & Clarity: Confidence in responses, engagement, and clarity.
        - **Leadership Ability: Ability to guide, influence, and motivate others toward goals.
        - **Adaptability & Learning Agility: Ability to adjust quickly to change and learn new concepts.
        - **Team Collaboration Skills: Ability to work effectively with others toward shared goals.
        - **Emotional Intelligence: Ability to understand, manage, and respond to emotions — both one’s own and others’.
        - **Initiative and Proactiveness: Ability to take action independently and drive tasks without needing prompts.
        - **Creativity and Innovation Thinking: Ability to generate original ideas and propose novel solutions.
        - **Resilience and Handling Feedback: Ability to remain positive through setbacks and grow from feedback.
        - **Attention to Detail: Ability to produce precise, accurate, and thorough work.

        `,
      system:
        "You are a professional interviewer analyzing a sample interview. Your task is to evaluate the candidate based on structured categories and let the total score be the sum of the scores of all categories divide by 100. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.",
    });

    const feedback = {
      totalScore,
      categoryScores: categoryScores.map((score: any) => ({
        name: score.name,
        score: score.score,
        comment: score.comment,
      })),
      strengths,
      areasForImprovement,
      finalAssessment,
    };
    const userAlreadyHasFeedback = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        feedbacks: {
          where: {
            interviewId,
          },
        },
      },
    });

    if (userAlreadyHasFeedback?.feedbacks.length) {
      const oldFeedback = userAlreadyHasFeedback.feedbacks[0].id;
      await prisma.feedback.delete({
        where: {
          id: oldFeedback,
        },
      });
    }

    const saveFeedBack = await prisma.feedback.create({
      data: {
        totalScore: feedback.totalScore,
        categoryScores: feedback.categoryScores,
        strengths: feedback.strengths,
        areasForImprovement: feedback.areasForImprovement,
        finalAssessment: feedback.finalAssessment,
        user: { connect: { id: userId } },
        interviewId,
      },
    });

    return {
      message: "interview feed back saved",
      status: 200,
      data: saveFeedBack,
    };
  } catch (error) {
    console.log("Error saving feedback:", error);

    return {
      message: "Internal server error",
      status: 500,
      data: null,
    };
  }
};
export const getFeedBackByInterviewId = async (feedbackId: string) => {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: {
        id: feedbackId,
      },
    });

    if (!feedback) {
      return {
        message: "No feedback found",
        status: 404,
        data: null,
      };
    }

    return {
      message: "Feedback found",
      status: 200,
      data: feedback,
    };
  } catch (error) {
    console.error(error);

    return {
      message: "Internal server error",
      status: 500,
      data: null,
    };
  }
};
