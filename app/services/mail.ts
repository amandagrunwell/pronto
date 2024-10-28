import { unsentInfos, updateInfos } from "@/lib/Dao/becDao";
import { mailAccount, ZohoAccounts } from "../envStore/types";
import { getClientDetails, getClNames } from "@/lib/Dao/emailServiceDao";
import { capitalizeName, getMessage } from "../utils";
import ZohoApi from "@/lib/zohoApi";
import logger from "@/lib/logger";
import CustomSmtp from "@/lib/CustomSmtp";
import prisma from "@/lib/prisma";

export const processEmails = async (
  n: number,
  emailType: mailAccount,
  type: "real" | "test",
  testEmails?: {
    id: string;
    ceo_name: string;
    ceo_email: string | null;
    cfo_email: string;
  }[]
) => {
  let clIndex = 0;

  try {
    const infos = type === "real" ? await unsentInfos(n) : testEmails;
    const cls = await getClNames();
    console.log(infos);

    if (!infos) return;
    for (let i = 0; i < infos.length; i++) {
      const clDetails = await getClientDetails(cls[clIndex]);
      if (!clDetails) {
        throw new Error("Client details not found.");
      }

      clIndex = (clIndex + 1) % cls.length;

      const info = infos[i];
      const email = info.cfo_email;
      const htmlMessage = await getMessage(clDetails.name);
      const randomTimeout =
        Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
      const from = `${capitalizeName(info.ceo_name)} <${
        emailType.sender_email
      }>`;

      const subject = `Re:${clDetails.name}'s Bill`;

      await delay(randomTimeout);
      if (emailType.service === "smtp") {
        await new CustomSmtp(emailType).sendEmail({
          from,
          to: email,
          subject: subject,
          html: htmlMessage,
        });
        if (type === "real") {
          await prisma.bec.update({
            where: { id: info.id },
            data: { isSent: type === "real" },
          });
        }

        logger.info(
          `Email sent to ${info.cfo_email} from ${emailType.sender_email}`
        );
      }
      if ((i + 1) % 10 === 0) {
        logger.info("Waiting 5 minutes before continuing...");
        await delay(5 * 60 * 1000);
      }
    }
  } catch (error: any) {
    logger.error(`Transaction failed: ${error.message}`);
    throw new Error(error);
  }
};
// export const processEmails = async (n: number, emailType: mailAccount) => {
//   let clIndex = 0;
//   const infos = await unsentInfos(n);
//   const cls = await getClNames();

//   for (let i = 0; i < infos.length; i++) {
//     const clDetails = await getClientDetails(cls[clIndex]);
//     if (!clDetails) {
//       process.exit(1);
//     }

//     clIndex = (clIndex + 1) % cls.length;

//     const info = infos[i];
//     const email = info.cfo_email;
//     const htmlMessage = await getMessage(clDetails.name);
//     const randomTimeout = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
//     const from = `${capitalizeName(info.ceo_name)} <${emailType.sender_email}>`;

//     const subject = `Re:${clDetails.name}'s Bill`;

//     try {
//       await delay(randomTimeout);

//       if (emailType.service === "zoho") {
//         await new ZohoApi(emailType).sendEmail({
//           fromAddress: from,
//           toAddress: email,
//           subject: subject,
//           content: htmlMessage,
//         });
//         logger.info(
//           `Email sent to ${info.cfo_email} from ${emailType.sender_email}`
//         );
//       } else if (emailType.service === "smtp") {
//         try {
//           await new CustomSmtp(emailType).sendEmail({
//             from,
//             to: info.cfo_email,
//             subject: subject,
//             html: htmlMessage,
//             // attachments:
//             //   clDetails.accountLevel === "prepaid"
//             //     ? pdfAttachment(clDetails.name)
//             //     : null,
//           });
//           await updateInfos({ id: info.id, isSent: true });
//           logger.info(
//             `Email sent to ${info.cfo_email} from ${emailType.sender_email}`
//           );
//         } catch (error: any) {
//           logger.error(
//             `Failed to send email to ${info.cfo_email}: ${error.message}`
//           );
//         }
//       }
//     } catch (error: any) {
//       logger.error(
//         `Failed to send email to ${info.cfo_email}: ${error.message}`
//       );
//       break;
//     }

//     if ((i + 1) % 10 === 0) {
//       logger.info("Waiting 5 minutes before continuing...");
//       await delay(3 * 60 * 1000);
//     }
//   }
// };

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
