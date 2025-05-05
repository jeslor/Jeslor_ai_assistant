import prisma from "@/lib/prisma/prisma";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { type, role, level, techstack, totalQuestions, userid, company } =
      await req.json();

    console.log(totalQuestions);

    let totalQuestionsInt = parseInt(totalQuestions, 10);
    if (
      isNaN(totalQuestionsInt) ||
      totalQuestionsInt <= 0 ||
      totalQuestionsInt > 10
    ) {
      totalQuestionsInt = 10; // Default to 5 if invalid
    } else {
      totalQuestionsInt = Math.min(totalQuestionsInt, 10); // Limit to a maximum of 10
    }

    const { text: questions2 } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `search the web and find the url of the company ${company}, please make sure you return only the root url and nothing else. If no url is found, return "".`,
    });

    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${totalQuestionsInt}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you very much!!!
    `,
    });

    console.log("Company URL found:", questions);

    const user = await prisma.user.findUnique({
      where: {
        id: userid,
      },
    });
    if (!user) {
      console.log("User not found");

      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const interview = await prisma.interview.create({
      data: {
        userId: user.id,
        company: questions2,
        role,
        level,
        techstack: techstack.split(","),
        type,
        questions: JSON.parse(questions),
        finalized: false, // Assuming 'finalized' is a boolean and defaults to false
      },
    });

    return NextResponse.json({
      message: "Interview created successfully",
      interview,
      status: 200,
    });
  } catch (error) {
    console.error("Error creating interview:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
};
