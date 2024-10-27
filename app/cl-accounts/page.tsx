"use client";
import { FC } from "react";
import Form from "./Form";
import ClientFormContextProvider from "../store/clAccounts";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="text-white mx-auto">
      <ClientFormContextProvider>
        <Form />
      </ClientFormContextProvider>
    </div>
  );
};

export default page;
