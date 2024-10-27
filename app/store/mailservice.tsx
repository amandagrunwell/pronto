"use client";
import { createContext, useContext, useReducer } from "react";
import {
  mailContextValue,
  mailForm,
  MailFormContextProviderProps,
  mailReducerAction,
  mailServiceState,
} from "../types/mail";
import { setFutureDate } from "@/lib/utils";

// Explicitly define type infoContextValue | null
const infoForm = createContext<mailContextValue | null>(null);

export function useMailFormContext() {
  const infoContext = useContext(infoForm);

  if (infoContext === null) {
    throw new Error("infoContext is null, something is wrong");
  }
  return infoContext;
}

export const initialFormValue: mailForm = {
  service: "smtp",
  sender_email: "",
  sender_password: "",
  ZohoClientId: "",
  zohoClientSecret: "",
  ZohoAuthCode: "",
  ZohoRefreshToken: "",
  zoho_account_id: "",
  expires: setFutureDate(15),
  domainServiceEmail: "",
  host: "",
  port: 0,
  domain: "",
  isGood: true,
};

const initialState: mailServiceState = {
  mailFormValue: initialFormValue,
  errors: {},
  alert: { message: "", color: "" },
  allMailService: [],
  filteredMailServices: [],
};

function reducer(
  state: mailServiceState,
  action: mailReducerAction
): mailServiceState {
  switch (action.type) {
    case "setFormValue":
      return { ...state, mailFormValue: { ...action.payload } };
    case "setError":
      return { ...state, errors: { ...action.payload } };
    case "setAlert":
      return { ...state, alert: { ...action.payload } };
    case "setMailService":
      return { ...state, allMailService: [...action.payload] };

    case "setFilteredMailService":
      return { ...state, filteredMailServices: [...action.payload] };

    default:
      return state;
  }
}

export default function MailFormContextProvider({
  children,
}: MailFormContextProviderProps) {
  const [currentState, dispatch] = useReducer(reducer, initialState);

  const ctx: mailContextValue = {
    setFormValue(formValue) {
      dispatch({ type: "setFormValue", payload: formValue });
    },
    setErrors({}) {},
    setMailService(infos) {
      dispatch({ type: "setMailService", payload: infos });
    },
    setFilteredMailService(infos) {
      dispatch({ type: "setFilteredMailService", payload: infos });
    },
    setAlert(message, color) {
      dispatch({ type: "setAlert", payload: { message, color } });
    },
    filteredMailServices: currentState.filteredMailServices,
    allMailService: currentState.allMailService,
    errors: currentState.errors,
    mailFormValue: currentState.mailFormValue,
    alert: currentState.alert,
  };

  // Correct usage of infoForm.Provider
  return <infoForm.Provider value={ctx}>{children}</infoForm.Provider>;
}
