"use client";
import { FC, useState } from "react";
import LabelInputContainer from "../components/ui/LabelInputContainer";

import Form from "./Form";
import MailFormContextProvider from "../store/mailservice";
import Grid from "./Grid";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <MailFormContextProvider>
      <Form />;
      <Grid />
      {/* <Table /> */}
    </MailFormContextProvider>
  );
};

export default page;
