import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email } = await req.json();

  try {
    await prisma.$connect();
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found", status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
