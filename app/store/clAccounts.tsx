"use client";
import { createContext, useContext, useReducer } from "react";
import {
  clForm,
  clientContextValue,
  ClientFormContextProviderProps,
  clientReducerAction,
  clientState,
} from "../types/clAccounts";

const clientForm = createContext<clientContextValue | null>(null);

export function useClFormContext() {
  const clientContext = useContext(clientForm);

  if (clientContext === null) {
    throw new Error("clientContext is null, something is wrong");
  }
  return clientContext;
}

export const initialFormValue: clForm = {
  name: "",
  email: "",
  bankName: "",
  routing: "",
  accountNumber: "",
  accountType: "",
  accountLevel: "",
  isActive: true,
  amount: "",
};

const initialState: clientState = {
  formValue: initialFormValue,
  errors: {},
  alert: { message: "", color: "" },
  allClients: [],
  filteredClients: [],
};

function reducer(state: clientState, action: clientReducerAction): clientState {
  switch (action.type) {
    case "setFormValue":
      return { ...state, formValue: { ...action.payload } };
    case "setError":
      return { ...state, errors: { ...action.payload } };
    case "setAlert":
      return { ...state, alert: { ...action.payload } };
    case "setClients":
      return { ...state, allClients: [...action.payload] };

    case "setFilteredClients":
      return { ...state, filteredClients: [...action.payload] };

    default:
      return state;
  }
}

export default function ClientFormContextProvider({
  children,
}: ClientFormContextProviderProps) {
  const [currentState, dispatch] = useReducer(reducer, initialState);

  const ctx: clientContextValue = {
    setFormValue(formValue) {
      dispatch({ type: "setFormValue", payload: formValue });
    },
    setErrors(error) {
      dispatch({ type: "setError", payload: error });
    },

    setAlert(message, color) {
      dispatch({ type: "setAlert", payload: { message, color } });
    },
    setClients(info) {
      dispatch({ type: "setClients", payload: info });
    },
    setFilteredClients(infos) {
      dispatch({ type: "setFilteredClients", payload: infos });
    },

    allClients: currentState.allClients,
    formValue: currentState.formValue,
    errors: currentState.errors,
    alert: currentState.alert,
    filteredClients: currentState.filteredClients,
  };

  return <clientForm.Provider value={ctx}>{children}</clientForm.Provider>;
}
