import { processReply } from "@/app/services/mail";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { sender_email, cfo_email, ceo_name, subject, replyHtml } =
    await req.json();
  const emailAccount = await prisma.emailAccounts.findFirst({
    where: { sender_email },
  });
  if (!emailAccount) {
    process.exit(1);
  }
  try {
    await processReply(replyHtml, ceo_name, subject, cfo_email, emailAccount);

    return NextResponse.json({
      status: 200,
      message: "Email reply sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred while sending the email",
    });
  }
}
