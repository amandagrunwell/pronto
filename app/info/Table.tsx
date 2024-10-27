"use client";

import Spinner from "@/app/components/ui/Spinner";
import { setShowAlert } from "@/app/utils";
import {
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from "@heroicons/react/16/solid";
import React, { FC, useCallback, useState } from "react";
import { useInfoFormContext } from "../store/infos";

interface TableProps {
  // data: infos[];
}

const Table: FC<TableProps> = () => {
  const { allInfos, setInfos, setAlert, filteredInfos } = useInfoFormContext();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCopy = useCallback((text: string) => {
    setShowAlert("copied to clipboard", "red", setAlert, 500);
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }, []);

  async function handleUpdateInfo(sent: boolean, id: string) {
    const sentValue = { id, isSent: !sent };
    try {
      setLoadingId(id);
      const response = await fetch("/api/info", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentValue),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.status.toString().startsWith("5")) {
        alert("error");
        return;
      }
      setShowAlert("marked as email sent", "green", setAlert, 1000);
      const newInfo = allInfos.filter((info) => info.id !== id);
      setInfos(newInfo);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingId(null);
    }
  }

  function capitalizeEachWord(str: string): string {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <div className="overflow-auto h-96 mt-10 text-white font-sans ">
      <table className="main-text w-full p-5">
        <thead className="border-b border-solid border-black">
          <tr className="font-bold md:text-xl space-x-5 h-14">
            <th className="border">CEO Name</th>
            <th className="border">CEO Email</th>
            <th className="border">CFO Email</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredInfos.map((row, index) => (
            <tr key={index} className="h-2 px-2">
              <td className=" border ">
                <div className="flex flex-row items-center justify-center space-x-3 capitalize">
                  <p>{row.ceo_name}</p>
                  <button
                    onClick={() => handleCopy(capitalizeEachWord(row.ceo_name))}
                    className="text-blue-500"
                    aria-label={`Copy CEO name: ${row.ceo_name}`}
                  >
                    <ClipboardDocumentCheckIcon className="w-4" />
                  </button>
                </div>
              </td>
              <td className=" border ">
                <div className="flex flex-row items-center justify-center space-x-3 capitalize">
                  <p>{row.ceo_email}</p>
                </div>
              </td>
              <td className=" border ">
                <div className="flex flex-row items-center justify-center space-x-3">
                  <p>{row.cfo_email}</p>
                  <button
                    onClick={() =>
                      handleCopy(capitalizeEachWord(row.cfo_email))
                    }
                    className="text-blue-500"
                    aria-label={`Copy CFO email: ${row.cfo_email}`}
                  >
                    <ClipboardDocumentCheckIcon className="w-4" />
                  </button>
                </div>
              </td>
              <td className=" border   hover:bg-stone-600">
                <button
                  className=" p-1 rounded-2xl  "
                  type="button"
                  onClick={() => handleUpdateInfo(row.isSent, row.id)}
                >
                  <div className="flex justify-center space-x-2 flex-row">
                    {loadingId === row.id ? (
                      <Spinner color="green" />
                    ) : (
                      <CheckCircleIcon className="w-4 text-gray-300" />
                    )}
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
