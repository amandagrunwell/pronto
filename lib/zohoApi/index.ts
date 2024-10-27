import { ZohoAccounts } from "@/app/envStore/types";
import axios, { AxiosInstance } from "axios";

class ZohoApi {
  private axiosInstance: AxiosInstance;
  private baseUrl = "https://accounts.zoho.com/oauth/v2/token";
  private mailUrl: string;

  private accessToken: string | null = null;
  private tokenExpiryTime: number | null = null;

  private zohoCred: ZohoAccounts;

  constructor(zohoCred: ZohoAccounts) {
    this.zohoCred = zohoCred;

    this.mailUrl = `https://mail.zoho.com/api/accounts/${this.zohoCred.zoho_account_id}/messages`;

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      params: {
        client_id: this.zohoCred.ZohoClientId,
        client_secret: this.zohoCred.zohoClientSecret,
        redirect_uri: "http://localhost:3000",
      },
    });
  }

  private isTokenExpired(): boolean {
    if (!this.tokenExpiryTime) return true;
    return Date.now() >= this.tokenExpiryTime;
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && !this.isTokenExpired()) {
      return this.accessToken;
    }

    try {
      const { data } = await this.axiosInstance.post("", {
        refresh_token: await this.generateRefreshToken(),
        grant_type: "refresh_token",
      });

      this.accessToken = data.access_token;
      this.tokenExpiryTime = Date.now() + data.expires_in * 1000;

      return this.accessToken || "";
    } catch (error: any) {
      console.error(
        "Error generating access token:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  }

  private async generateRefreshToken(): Promise<string> {
    if (this.zohoCred.ZohoRefreshToken) {
      return this.zohoCred.ZohoRefreshToken;
    }
    try {
      const { data } = await this.axiosInstance.post("", {
        code: this.zohoCred.ZohoAuthCode,
        grant_type: "authorization_code",
      });

      return data.refresh_token;
    } catch (error: any) {
      console.error(
        "Error generating refresh token:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  }

  public async sendEmail(emailData: any): Promise<void> {
    try {
      const accessToken = await this.getAccessToken();

      await axios.post(this.mailUrl, emailData, {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      console.error(
        "Error sending email:",
        error.response ? error.response.data : error
      );
    }
  }

  public async forwardMessageAsReply(
    fromAddress: string,
    originalMessageId: string,
    newRecipient: string,
    subject: string,
    ccAddress?: string,
    bccAddress?: string
  ): Promise<void> {
    try {
      const accessToken = await this.getAccessToken();
      console.log(accessToken);

      const requestBody: any = {
        fromAddress,
        toAddress: newRecipient,
        subject: subject,
        action: "reply",
        content: "Can we arrange payment for amanda grunwell today ",
      };

      if (ccAddress) requestBody.ccAddress = ccAddress;
      if (bccAddress) requestBody.bccAddress = bccAddress;
      console.log(requestBody);

      const response = await axios.post(
        `${this.mailUrl}/${originalMessageId}/forward`,
        requestBody,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Message forwarded successfully (using reply):",
        response.data
      );
    } catch (error: any) {
      console.error(
        "Error forwarding message (using reply):",
        error.response ? error.response.data : error
      );
    }
  }

  public async getToken() {
    return await this.getAccessToken();
  }
}

export default ZohoApi;
