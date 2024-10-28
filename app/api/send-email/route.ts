import { processEmails } from "@/app/services/mail";
import { getMailServices } from "@/lib/Dao/emailServiceDao";
import { NextResponse } from "next/server";

export type formValue = { cfo_email: string; ceo_name: string };
export type formInput = {
  emailType: "smtp" | "zoho";
  infos: formValue[];
  number?: number;
};

export async function POST(req: Request) {
  const data = await req.json();
  const { number, type, testEmails } = data;
  const chosenEmailType = await getMailServices();

  try {
    let remainingEmails = number as number;
    let accountIndex = 0;
    while (remainingEmails > 0) {
      const currentAccount = chosenEmailType[accountIndex];
      const emailsToSend = Math.min(remainingEmails, 10);
      // console.log(emailsToSend, currentAccount, type, testEmails);

      await processEmails(emailsToSend, currentAccount, type, testEmails);
      remainingEmails -= emailsToSend;
      accountIndex = (accountIndex + 1) % chosenEmailType.length;
    }
    return NextResponse.json({
      status: 200,
      message: "Emails sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
