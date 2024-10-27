import { FC, useEffect } from "react";
import { useMailFormContext } from "../store/mailservice";
import GridItems from "./GridItems";

interface GridProps {}

const Grid: FC<GridProps> = ({}) => {
  const {
    mailFormValue,
    filteredMailServices,
    setFilteredMailService,
    setMailService,
  } = useMailFormContext();
  useEffect(() => {
    fetch("/api/email-service")
      .then((data) => data.json())
      .then((data) => {
        setFilteredMailService(data.data);
        setMailService(data.data);
      });
  }, []);
  return (
    <div className=" text-white px-10">
      <ul className="grid grid-cols-3 gap-3">
        {filteredMailServices.map((data, index) => (
          <GridItems key={index} data={data} />
        ))}
      </ul>
    </div>
  );
};

export default Grid;
