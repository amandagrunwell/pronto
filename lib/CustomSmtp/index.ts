import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class CustomSmtp {
  private transporter: nodemailer.Transporter;

  constructor(CustomSmtp: any) {
    this.transporter = nodemailer.createTransport({
      // host: "mail.privateemail.com",
      host: CustomSmtp.host,
      port: CustomSmtp.port,
      // port: 465,
      secure: CustomSmtp.port === 465,
      auth: {
        user: CustomSmtp.sender_email,
        pass: CustomSmtp.sender_password,
      },
      dkim: {
        domainName: CustomSmtp.domain,
        keySelector: "default",
        privateKey: CustomSmtp.dkimPath,
      },
    });
  }

  public async sendEmail(mailOptions: {
    from: string;
    to: any;
    subject: any;
    html: any;
    attachments?: any;
  }): Promise<void> {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent: %s", info);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}
export default CustomSmtp;
