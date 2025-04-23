import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { accountValidator } from "@/lib/validators/account.validator";

export const POST = async (req: Request) => {
  const body = await req.json();

  const { email, password, username } = accountValidator.parse(body);

  try {
    await prisma.$connect();
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      return NextResponse.json({ error: "User already exists", status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json({ user, status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors, status: 422 });
    }
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email already exists", status: 409 });
    }
    return NextResponse.json({ error: "Internal server error", status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
