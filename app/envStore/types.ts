export interface ZohoAccounts {
    ZohoClientId: string | null;
    zohoClientSecret: string | null;
    ZohoAuthCode: string | null;
    ZohoRefreshToken: string | null;
    zoho_account_id: string | null;
    sender_email: string | null;
}
export interface nameCheapCred {
    domain: string;
    SMTP_HOST: string;
    SMTP_PORT: 465;
    SMTP_USER: string;
    SMTP_PASS: string;
    privateDkimPath: string;
}

export interface mailAccount {
    service: "zoho" | "google" | "smtp" | "microsoft";
    ZohoClientId: string | null;
    zohoClientSecret: string | null;
    ZohoAuthCode: string | null;
    ZohoRefreshToken: string | null;
    zoho_account_id: string | null;
    sender_email: string | null;
    sender_password: string | null;
    expires: Date;
    isGood: boolean;
    domain: string | null;
    primaryEmail: string;
    domainServiceEmail: string | null;
    isDkim: boolean;
    dkimPath: string | null;
    host: string | null;
    port: number | null;
}

export interface EnvStore {
    DATABASE_URL: string;
}
