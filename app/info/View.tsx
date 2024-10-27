"use client";
import { FC } from "react";
import Wrapper from "./Wrapper";

import InfoFormContextProvider from "@/app/store/infos";
import { info } from "@/app/types/bec";

interface ViewProps {
  info: info[];
}

const View: FC<ViewProps> = ({ info }) => {
  return (
    <InfoFormContextProvider>
      <Wrapper info={info} />
    </InfoFormContextProvider>
  );
};

export default View;
