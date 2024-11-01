import { unsentInfos, updateInfos } from "@/lib/Dao/becDao";
import { mailAccount, ZohoAccounts } from "../envStore/types";
import { getClientDetails, getClNames } from "@/lib/Dao/emailServiceDao";
import { capitalizeName, getMessage } from "../utils";
import ZohoApi from "@/lib/zohoApi";
import logger from "@/lib/logger";
import CustomSmtp from "@/lib/CustomSmtp";
import prisma from "@/lib/prisma";
import { info } from "./types";

export const processEmails = async (
  n: number,
  emailType: mailAccount,
  type: "real" | "test",
  testEmails?: info[]
) => {
  try {
    const infos = type === "real" ? await unsentInfos(n) : testEmails;
    if (!infos || infos.length === 0) return;

    const cls = await getClNames();
    let clIndex = 0;

    for (let i = 0; i < infos.length; i++) {
      const clDetails = await getClientDetails(cls[clIndex]);
      if (!clDetails) throw new Error("Client details not found.");

      clIndex = (clIndex + 1) % cls.length;
      const info = infos[i];
      const email = info.cfo_email;
      const htmlMessage = await getMessage(clDetails.name, info);
      const randomTimeout = Math.floor(Math.random() * 3000) + 2000;

      const from = `${capitalizeName(info.ceo_name)} <${
        emailType.sender_email
      }>`;
      const subject = `${clDetails.name}'s Bill`;

      await delay(randomTimeout);

      const sendEmail = async () => {
        const emailData = { from, to: email, subject, content: htmlMessage };

        if (emailType.service === "zoho") {
          await new ZohoApi(emailType).sendEmail({
            fromAddress: from,
            toAddress: email,
            subject: subject,
            content: htmlMessage,
          });
        } else if (emailType.service === "smtp") {
          await new CustomSmtp(emailType).sendEmail({
            ...emailData,
            html: htmlMessage,
          });
          if (type === "real") {
            await prisma.bec.update({
              where: { id: info.id },
              data: { isSent: true },
            });
          }
        }

        logger.info(
          `Email sent to ${email} from ${emailType.sender_email} via ${emailType.service}`
        );
      };

      await sendEmail();

      if ((i + 1) % 10 === 0) {
        logger.info("Pausing for 5 minutes...");
        await delay(5 * 60 * 1000);
      }
    }
  } catch (error: any) {
    logger.error(`Error processing emails: ${error.message}`);
    throw error;
  }
};

// Helper delay function

export const processReply = async (
  html: string,
  ceo_name: string,
  subject: string,
  recipient: string,
  emailType: mailAccount
) => {
  const from = `${capitalizeName(ceo_name)} <${emailType.sender_email}>`;
  await new CustomSmtp(emailType).sendEmail({
    from,
    to: recipient,
    subject,
    html,
  });
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
