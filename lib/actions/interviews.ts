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
      data: interviews,
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
