import { FC } from "react";
import { mailForm } from "../types/mail";

interface GridItemsProps {
  data: mailForm;
}

function dateDiff(date: Date) {
  const today = new Date();
  const givenDate = new Date(date);
  const diffInMs = today.getTime() - givenDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}

const GridItems: FC<GridItemsProps> = ({ data }) => {
  return (
    <div className="p-3 border border-gray-500 w-full">
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row space-x-3">
          {" "}
          <p>
            Service : <span className="text-green-600">{data.service}</span>
          </p>
          <p>
            Status :{" "}
            <span className="text-green-600">
              {data.isGood ? "Active" : "Not Active"}
            </span>
          </p>
        </div>
        <div className="flex flex-row space-x-3">
          <p>
            Smtp Host: <span className="text-green-600">{data.host}</span>
          </p>
          <p>
            Port: <span className="text-green-600">{data.port}</span>
          </p>
        </div>

        <p>
          Sender : <span className="text-green-600">{data.sender_email}</span>
        </p>
        <p>
          Password :{" "}
          <span className="text-green-600">{data.sender_password}</span>
        </p>
        <p>
          Domain Email Login :{" "}
          <span className="text-green-600">{data.domainServiceEmail}</span>
        </p>
        <p>Expires in {Math.abs(dateDiff(data.expires))} days</p>
      </div>
    </div>
  );
};

export default GridItems;
