import { FC, useEffect } from "react";
import { useMailFormContext } from "../store/mailservice";
import { dateDiff } from "../utils";

interface TableProps {}

const Table: FC<TableProps> = ({}) => {
  const {
    mailFormValue,
    filteredMailServices,
    setFilteredMailService,
    setMailService,
  } = useMailFormContext();

  return (
    <div className="px-10">
      <div className="overflow-auto h-96 mt-10 text-white font-sans ">
        <table className="main-text w-full p-5">
          <thead className="border-b border-solid border-black">
            <tr className="font-bold md:text-xl space-x-5 ">
              <th className="border">Service</th>
              <th className="border">email</th>
              <th className="border">days to expiry</th>
              <th className="border">info</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredMailServices.map((row, index) => (
              <tr key={index} className="h-2 px-2">
                <td className=" border ">
                  <div className="flex flex-row items-center justify-center space-x-3 capitalize">
                    <p>{row.service}</p>
                  </div>
                </td>
                <td className="border">
                  <div className="flex flex-row items-center justify-center space-x-3 capitalize">
                    <p>{row.sender_email}</p>
                  </div>
                </td>
                <td className=" border ">
                  <div className="flex flex-row items-center justify-center space-x-3">
                    <p>{Math.abs(dateDiff(row.expires))}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
