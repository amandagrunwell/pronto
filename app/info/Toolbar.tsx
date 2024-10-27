import Label from "@/app/components/Label";
import { Input } from "@/app/components/ui/input";
import LabelInputContainer from "@/app/components/ui/LabelInputContainer";
import { Select } from "@/app/components/ui/Select";
import { FC, useEffect, useState } from "react";
import { useInfoFormContext } from "../store/infos";

interface ToolbarProps {}

const Toolbar: FC<ToolbarProps> = ({}) => {
  const { view, setView, filteredInfos, setFilteredInfos, allInfos } =
    useInfoFormContext();
  const [query, setQuery] = useState<string>("");
  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;

    if (value === "form" || value === "table") {
      console.log(value);
      setView(value);
    }
  }
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }
  useEffect(() => {
    const updatedCriteria =
      query.length > 0
        ? allInfos.filter((info) => {
            return info.cfo_email.includes(query);
          })
        : allInfos;
    setFilteredInfos(updatedCriteria);
  }, [query]);
  const sentMail = filteredInfos.filter((info) => info.isSent);
  const unsentMails = filteredInfos.filter((info) => !info.isSent);

  return (
    <div className="flex flex-col space-y-3 border rounded-2xl border-gray-600 w-full p-5 text-white">
      <div className="flex md:flex-row flex-col md:space-x-3 space-y-3 md:space-y-0">
        <LabelInputContainer>
          <Label value="Select View" cssClass="text-gray-400 font-sans" />
          <Select
            options={["form", "table"]}
            onChange={handleSelect}
            name="view"
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label value="Search" cssClass="text-gray-400 font-sans" />
          <Input type="search" onChange={handleSearch} />
        </LabelInputContainer>
      </div>
      <div>
        <p className="text-red-400">Sent : {sentMail.length}</p>
        <p className="text-green-400">Available : {unsentMails.length}</p>
      </div>
    </div>
  );
};

export default Toolbar;
