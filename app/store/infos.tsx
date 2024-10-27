"use client";
import { createContext, useContext, useReducer } from "react";
import {
  infoContextValue,
  InfoFormContextProviderProps,
  infoFormValue,
  infoReducerAction,
  infoState,
} from "../types/bec";

// Explicitly define type infoContextValue | null
const infoForm = createContext<infoContextValue | null>(null);

export function useInfoFormContext() {
  const infoContext = useContext(infoForm);

  if (infoContext === null) {
    throw new Error("infoContext is null, something is wrong");
  }
  return infoContext;
}

export const initialFormValue: infoFormValue = {
  ceo_name: "",
  ceo_email: "",
  cfo_email: "",
};

const initialState: infoState = {
  infoFormValue: initialFormValue,
  errors: {},
  alert: { message: "", color: "" },
  allInfos: [],
  filteredInfos: [],
  view: "table",
};

function reducer(state: infoState, action: infoReducerAction): infoState {
  switch (action.type) {
    case "setFormValue":
      return { ...state, infoFormValue: { ...action.payload } };
    case "setError":
      return { ...state, errors: { ...action.payload } };
    case "setAlert":
      return { ...state, alert: { ...action.payload } };
    case "setInfos":
      return { ...state, allInfos: [...action.payload] };
    case "setView":
      return { ...state, view: action.payload };
    case "setFilteredInfos":
      return { ...state, filteredInfos: [...action.payload] };

    default:
      return state;
  }
}

export default function InfoFormContextProvider({
  children,
}: InfoFormContextProviderProps) {
  const [currentState, dispatch] = useReducer(reducer, initialState);

  const ctx: infoContextValue = {
    setFormValue(formValue) {
      dispatch({ type: "setFormValue", payload: formValue });
    },
    setErrors(error) {
      dispatch({ type: "setError", payload: error });
    },

    setAlert(message, color) {
      dispatch({ type: "setAlert", payload: { message, color } });
    },
    setInfos(info) {
      dispatch({ type: "setInfos", payload: info });
    },
    setFilteredInfos(infos) {
      dispatch({ type: "setFilteredInfos", payload: infos });
    },
    setView(view) {
      dispatch({ type: "setView", payload: view });
    },
    allInfos: currentState.allInfos,
    infoFormValue: currentState.infoFormValue,
    errors: currentState.errors,
    alert: currentState.alert,
    filteredInfos: currentState.filteredInfos,
    view: currentState.view,
  };

  // Correct usage of infoForm.Provider
  return <infoForm.Provider value={ctx}>{children}</infoForm.Provider>;
}
