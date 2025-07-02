"use server";
import prisma from "@/lib/prisma/prisma";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { cleanAIJsonResponse } from "../helpers/json";

interface InterviewProps {
  userId: string;
  totalQuestions: number;
  company: string;
  type: string;
  level: string;
  jobDescription: string;
}

export const createInterview = async (data: InterviewProps) => {
  try {
    const { userId, totalQuestions, company, type, level, jobDescription } =
      data;

    const { text: companyUrl } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `search the web and find the url of the company ${company}, please make sure you return only the root url and nothing else. If no url is found, return "".`,
    });

    let { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare ${totalQuestions} questions for a job interview, let the questions be not so long but professional depending on the level provided here ${level}.
        The job description from the job listing platform is ${jobDescription}.
        The job experience level is ${level}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        Make sure you go through the  job description and find the tech stack used in the job, return only the name of the Technologies and tools they use.
        Make sure you go through the job  description and find the Role.
        Please return only an object having a three properties,like this{
          role: " the role you found in the job description",
          techstack: "the tech stack you found in the job description",
          questions: ["Question 1", "Question 2", "Question 3"] 
        } without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you very much!!!
    `,
    });

    questions = cleanAIJsonResponse(questions);
    const questionsParsed = JSON.parse(questions);

    const interview = await prisma.interview.create({
      data: {
        userId,
        company: companyUrl,
        role: questionsParsed.role,
        techstack: questionsParsed.techstack.split(","),
        questions: questionsParsed.questions,
        type,
        level,
        finalized: false,
      },
    });
    if (!interview) {
      throw new Error("Interview not created");
    }
    return {
      message: "Interview created successfully",
      status: 200,
      data: {
        ...interview,
        questions: interview.questions.length,
      },
    };
  } catch (error) {
    console.error("Error creating interview:", error);
    return {
      message: `Internal server error: ${error}`,
      status: 500,
      data: null,
    };
  }
};

export const generateInterviewFromChat = async ({ userId, chats }: any) => {
  console.log(chats, "chats from generateInterviewFromChat");

  const transformedScript = chats
    .map(
      (sentence: { role: string; content: string }) =>
        `-${sentence.role}: ${sentence.content} \n`
    )
    .join("");
  try {
    let { text: newInterview } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Go through this  chat data ${transformedScript} carefully and generate an object having the following properties:
      {
        role: "the role you found in the chat",
        type: "the type of interview you found in the chat, make sure the type is either technical, mixed or behavioral",
        level: "the level of the position you found in the chat, make sure the level is either junior, mid-level, senior or any other level you found in the chat",
        company: "the company website you found in the chat, make sure the company is a valid website",
        techstack: "the tech stack you found in the chat, make sure the tech stack is an array of technologies and tools used in the job",
        totalQuestions: "the total number of questions you found in the chat, make sure the total number of questions is a number between 3 and 10",

      },
      Thank you very much!!!

      `,
    });

    console.log("newInterview", newInterview);
  } catch (error) {}
};

export const getInterviewsByUser = async (userId: string, page: number) => {
  const limit = 12;
  const skip = page * limit;

  try {
    const interviews = await prisma.interview.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip,
    });

    if (interviews.length === 0) {
      return {
        message: "You have not generated any interviews yet or they are empty",
        status: 200,
        data: [],
      };
    }

    return {
      message: "Interviews found",
      status: 200,
      data: interviews.map((int) => ({
        ...int,
        questions: int.questions.length,
      })),
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

export const getInterviewsNotByUser = async (userId: string, page: number) => {
  console.log("this code ran not by user");
  const limit = 12;
  const skip = page * limit;

  try {
    const interviews = await prisma.interview.findMany({
      where: {
        NOT: {
          userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip,
    });

    if (interviews.length === 0) {
      return {
        message: "Thats all we have for now",
        status: 200,
        data: [],
      };
    }

    return {
      message: "Interviews found",
      status: 200,
      data: interviews.map((int) => ({
        ...int,
        questions: int.questions.length,
      })),
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

export const getInterViewById = async (interviewId: string) => {
  try {
    const interview = await prisma.interview.findUnique({
      where: {
        id: interviewId,
      },
    });

    if (!interview) {
      return {
        message: "No interviews found",
        status: 404,
        data: null,
      };
    }

    return {
      message: "Interview found",
      status: 200,
      data: interview,
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

export const deleteInterview = async (interviewId: string) => {
  console.log("interviewId", interviewId);

  try {
    const deleteAllFeedBacks = await prisma.feedback.deleteMany({
      where: {
        interviewId,
      },
    });
    console.log("deleteAllFeedBacks", deleteAllFeedBacks);

    const interview = await prisma.interview.delete({
      where: {
        id: interviewId,
      },
    });

    return {
      message: "Interview deleted",
      status: 200,
      data: interview,
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
