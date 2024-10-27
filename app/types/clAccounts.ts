import { ReactNode } from "react";

export type clientContextValue = clientState & {
  setFormValue: (formValue: clForm) => void;
  setErrors: ({}: { [key: string]: string }) => void;
  setAlert: (message: string, color: string) => void;
  setClients: (clients: clForm[]) => void;
  setFilteredClients: (clients: clForm[]) => void;
};

export type clientState = {
  formValue: clForm;
  errors: {
    [key: string]: string;
  };
  alert: alertType;
  allClients: clForm[];
  filteredClients: clForm[];
};

export type ClientFormContextProviderProps = {
  children: ReactNode;
};

export type clientReducerAction = {
  type: string;
  payload: any;
};

export type clForm = {
  name: string;
  email: string;
  bankName: string;
  routing: string;
  accountNumber: string;
  accountType: string;
  accountLevel: string;
  isActive: boolean;
  amount: string;
};

export type alertType = {
  message: string;
  color: string;
};
