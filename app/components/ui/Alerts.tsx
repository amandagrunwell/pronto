import { XMarkIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";

interface AlertsProps {
  color: string;
  message: string;
}

const Alerts: FC<AlertsProps> = ({ color, message }: AlertsProps) => {
  const [open, setOpen] = useState("sticky");
  const [opacity, setOpacity] = useState("90");

  function handleClose() {
    setTimeout(() => {
      setOpacity("0");
    }, 300); //
    setTimeout(() => {
      setOpen("hidden");
    }, 400); //
  }
  useEffect(() => {
    setOpen("sticky");
    setTimeout(() => {
      setOpen("hidden");
    }, 3000);
  }, [color, message]);

  if (!message && !color) return;
  return (
    <div className="fixed z-30 inset-0 flex items-start justify-center  bg-opacity-75 p-10">
      <div
        className={clsx(
          `${open} top-5 left-1/2 transform -translate-x-1/2 bg-gray-300 text-black font-bold font-sans transition-all ease-in-out duration-300  w-1/2 h-15 z-30 rounded-xl opacity-${opacity}`,
          { "bg-green-700": color === "green" },
          { "bg-red-700": color === "red" }
        )}
      >
        <div className="relative">
          <div className="py-3 flex items-center justify-center">
            <p className="text-xl">{message}</p>
          </div>
          <div className="absolute top-0 right-0 p-2 ">
            <XMarkIcon
              className="w-5 hover:text-gray-600"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
