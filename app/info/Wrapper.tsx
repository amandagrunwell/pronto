"use client";
import Alerts from "@/app/components/ui/Alerts";
import { useInfoFormContext } from "@/app/store/infos";
import { info } from "@/app/types/bec";
import { FC, ReactNode, useEffect } from "react";
import Toolbar from "./Toolbar";
import Table from "./Table";
import Form from "./Form";

interface WrapperProps {
  info: info[];
}

const Wrapper: FC<WrapperProps> = ({ info }) => {
  const { setInfos, alert, setFilteredInfos, view } = useInfoFormContext();

  useEffect(() => {
    setInfos(info);
    setFilteredInfos(info);
  }, []);

  const views = { form: <Form />, table: <Table /> };
  return (
    <div className="flex flex-col space-y-10 p-10 rounded-2xl mt-10">
      <Alerts message={alert.message} color={alert.message} />
      <Toolbar />
      <div className="  rounded-xl ">{views[view]}</div>
    </div>
  );
};

export default Wrapper;
