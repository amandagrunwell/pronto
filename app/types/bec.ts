import { ReactNode } from "react";

export type infoContextValue = infoState & {
  setFormValue: (formValue: infoFormValue) => void;
  setErrors: ({}: { [key: string]: string }) => void;
  setAlert: (message: string, color: string) => void;
  setInfos: (infos: info[]) => void;
  setFilteredInfos: (infos: info[]) => void;
  setView: (view: "table" | "form") => void;
};

export type infoFormValue = {
  ceo_name: string;
  ceo_email?: string;
  cfo_email: string;
};
export type infoState = {
  infoFormValue: infoFormValue;
  errors: {
    [key: string]: string;
  };
  alert: alertType;
  allInfos: info[];
  filteredInfos: info[];
  view: "table" | "form";
};

export type InfoFormContextProviderProps = {
  children: ReactNode;
};

export type infoReducerAction = {
  type: string;

  payload: any;
};

// export type info = {
//   id: string;
//   ceo_name: string;
//   ceo_email: string;
//   cfo_email: string;
//   isSent: boolean;
// };

export type alertType = {
  message: string;
  color: string;
};

export type messageDetails = {
  clName: string;
  clEmail: string;
  initialDate: string;
  reminderDate: string;
  mailSubject: string;
};

export type info = {
  id: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  ceo_name: string;
  ceo_email: string | null;
  cfo_email: string;
  isSent: boolean;
};
