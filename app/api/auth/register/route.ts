import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { accountValidator } from "@/lib/validators/account.validator";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    await prisma.$connect();
    const userExists = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (userExists) {
      return NextResponse.json({ error: "User already exists", status: 409 });
    }

    let user;
    if (body.isGitHub || body.isGoogle) {
      user = await prisma.user.create({
        data: {
          email: body.email,
          username: body.username,
          profileImage: body.profileImage || null,
        },
        select: {
          id: true,
          email: true,
          profileImage: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } else {
      const { email, password, username } = accountValidator.parse(body);
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await prisma.user.create({
        data: {
          email: body.email,
          hashedPassword,
          username: body.username,
          profileImage: body.profileImage || null,
        },
        select: {
          id: true,
          email: true,
          profileImage: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

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
