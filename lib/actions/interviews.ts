"use server";
import prisma from "@/lib/prisma/prisma";

export const getInterViews = async (userId: string) => {
  console.log("Fetching interviews for user:", userId);

  try {
    const interviews = await prisma.interview.findMany({
      where: {
        userId,
      },
    });

    if (interviews.length === 0) {
      return {
        message: "Interviews not found",
        status: 404,
        data: null,
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
        message: "Interview not found",
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
