"use client";
import React, { FC, useState } from "react";
import LabelInputContainer from "@/app/components/ui/LabelInputContainer";
import Label from "../components/Label";
import { Input } from "../components/ui/input";
import Spinner from "../components/ui/Spinner";
import { initialFormValue, useInfoFormContext } from "../store/infos";
import { setShowAlert } from "../utils";

interface FormProps {}

const Form: FC<FormProps> = () => {
  const {
    infoFormValue,
    setFormValue,
    setInfos,
    allInfos,
    setAlert,
    setFilteredInfos,
  } = useInfoFormContext();
  const [isSpinner, setIsSpinner] = useState(false);
  const currentLocation = "california";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValue({ ...infoFormValue, [name]: value.toLowerCase() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSpinner(true);
      const response = await fetch("/api/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...infoFormValue, location: currentLocation }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.status.toString().startsWith("5")) {
        setShowAlert("duplicate value", "red", setAlert);
        setFormValue(initialFormValue);
        return;
      }
      setShowAlert("info added", "green", setAlert);
      const formData = {
        id: data.data.id,
        ceo_name: data.data.ceo_name,
        ceo_email: data.data.ceo_email,
        cfo_email: data.data.cfo_email,
        isSent: data.data.isSent,
      };

      const updatedInfos = [...allInfos, formData];

      setInfos(updatedInfos);
      setFilteredInfos(updatedInfos);
      setFormValue(initialFormValue);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSpinner(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-3">
        <div className="flex md:flex-row md:space-x-2 flex-col space-y-3 md:space-y-0 ">
          <LabelInputContainer>
            <Label
              value="CEO Name"
              cssClass="text-gray-400 font-sans"
              required
            />
            <Input
              id="ceo_name"
              placeholder=""
              type="text"
              name="ceo_name"
              onChange={handleChange}
              value={infoFormValue.ceo_name}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label
              value="CEO Email"
              cssClass="text-gray-400 font-sans"
              required
            />
            <Input
              id="ceo_email"
              placeholder=""
              type="email"
              value={infoFormValue.ceo_email}
              name="ceo_email"
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label
              value="CFO Email"
              cssClass="text-gray-400 font-sans"
              required
            />
            <Input
              id="ceo_name"
              placeholder=""
              type="email"
              value={infoFormValue.cfo_email}
              name="cfo_email"
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-white p-2 font-sans font-bold md:w-1/2 text-black w-full tracking-widest hover:bg-black hover:text-gray-400 hover:border rounded-2xl"
          >
            {isSpinner ? <Spinner /> : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
