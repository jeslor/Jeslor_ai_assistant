"use server";
import primas from "@/lib/prisma/prisma";

export const findUserByEmail = async (email: string) => {
  try {
    let user = await primas.user.findUnique({
      where: {
        email: email,
      },
      include: {
        feedbacks: true,
      },
    });
    if (!user) {
      return JSON.parse(
        JSON.stringify({
          message: "User not found",
          status: 404,
          data: null,
        })
      );
    }

    return JSON.parse(
      JSON.stringify({
        message: "User found",
        status: 200,
        data: user,
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        message: "Internal server error",
        status: 500,
        data: null,
      })
    );
  }
};
