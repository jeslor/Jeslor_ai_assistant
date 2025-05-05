"use server";
import prisma from "@/lib/prisma/prisma";

export const getInterviewsByUser = async (userId: string, page: number) => {
  console.log("this code ran");

  const limit = 12;
  const skip = page * limit;

  try {
    const interviews = await prisma.interview.findMany({
      where: {
        userId,
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
