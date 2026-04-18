import prisma from "@/lib/prisma/prisma";
import { sendEmail, buildResetEmailHtml } from "@/lib/helpers/email";
import { NextResponse } from "next/server";
import crypto from "crypto";

const baseUrl =
  process.env.NEXTAUTH_URL || process.env.AUTH_URL || "http://localhost:3000";

export const POST = async (req: Request) => {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "If an account exists, a reset link has been sent." },
        { status: 200 },
      );
    }

    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id, used: false },
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        token,
        email: user.email!,
        userId: user.id,
        expiresAt,
      },
    });

    const resetUrl = `${baseUrl}/reset-password?token=${token}`;
    const html = buildResetEmailHtml(resetUrl, user.username || undefined);

    await sendEmail({
      to: user.email!,
      subject: "Reset your password",
      html,
    });

    return NextResponse.json(
      { message: "If an account exists, a reset link has been sent." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};
