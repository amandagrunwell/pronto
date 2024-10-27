import { ReactNode } from "react";

export type mailContextValue = mailServiceState & {
  setFormValue: (formValue: mailForm) => void;
  setErrors: ({}: { [key: string]: string }) => void;
  setAlert: (message: string, color: string) => void;
  setMailService: (infos: mailForm[]) => void;
  setFilteredMailService: (infos: mailForm[]) => void;
};

export type mailServiceState = {
  mailFormValue: mailForm;
  errors: {
    [key: string]: string;
  };
  alert: alertType;
  allMailService: mailForm[];
  filteredMailServices: mailForm[];
};

export type MailFormContextProviderProps = {
  children: ReactNode;
};

export type mailReducerAction = {
  type: string;
  payload: any;
};

export type mailForm = {
  service: "zoho" | "google" | "microsoft" | "smtp";
  sender_email: string;
  sender_password?: string;
  ZohoClientId?: string;
  zohoClientSecret?: string;
  ZohoAuthCode?: string;
  ZohoRefreshToken?: string;
  zoho_account_id?: string;
  expires: Date;
  host?: string;
  port?: number;
  domainServiceEmail: string;
  domain: string;
  isGood: boolean;
};

export type alertType = {
  message: string;
  color: string;
};
