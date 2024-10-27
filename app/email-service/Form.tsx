import { FC, useState } from "react";
import LabelInputContainer from "../components/ui/LabelInputContainer";
import Label from "../components/Label";
import { Select } from "../components/ui/Select";
import { Input } from "../components/ui/input";
import { initialFormValue, useMailFormContext } from "../store/mailservice";
import Zoho from "./Zoho";
import Spinner from "../components/ui/Spinner";
import Smtp from "./Smtp";

interface FormProps {}

const Form: FC<FormProps> = ({}) => {
  const {
    mailFormValue,
    setFormValue,
    allMailService,
    setMailService,
    setFilteredMailService,
  } = useMailFormContext();
  const [isSpinner, setIsSpinner] = useState(false);
  const [formView, setFormView] = useState<
    "zoho" | "google" | "microsoft" | "smtp"
  >("smtp");
  function handleChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;
    if (name === "service") {
      setFormView(value as "zoho" | "google" | "microsoft" | "smtp");
    }

    setFormValue({
      ...mailFormValue,
      [name]: name === "sender_password" ? value : value.toLowerCase(),
    });
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSpinner(true);

    try {
      const response = await fetch("/api/email-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...mailFormValue,
          port: Number(mailFormValue.port),
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.status.toString().startsWith("2")) {
        const formData = {
          id: data.data.id,
          ZohoAuthCode: data.data.ZohoAuthCode,
          ZohoClientId: data.data.ZohoClientId,
          ZohoRefreshToken: data.data.ZohoRefreshToken,
          createdAt: data.data.createdAt,
          expires: data.data.expires,
          isGood: data.data.isGood,
          sender_email: data.data.sender_email,
          service: data.data.service,
          zohoClientSecret: data.data.service,
          domainServiceEmail: data.data.domainServiceEmail,
          domain: data.data.domain,
          port: data.data.port,
        };
        const updatedInfos = [...allMailService, formData];
        setMailService(updatedInfos);
        setFilteredMailService(updatedInfos);
        // setFormValue(initialFormValue);
      } else {
        alert(data.message);
        return;
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsSpinner(false);
    }
  }

  const view = {
    zoho: <Zoho handleChange={handleChange} />,
    google: <div></div>,
    microsoft: <div></div>,
    smtp: <Smtp handleChange={handleChange} />,
  };

  return (
    <div className="p-5">
      {" "}
      <div className="text-white flex items-center justify-center my-auto ">
        <div className="border border-gray-500 rounded-xl p-4">
          <form action=" flex flex-col space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-row space-x-5">
              <LabelInputContainer>
                <Label
                  value="Select account type"
                  cssClass="text-gray-400 font-sans"
                />
                <Select
                  options={["zoho", "microsoft", "google", "smtp"]}
                  onChange={handleChange}
                  name="service"
                  value={mailFormValue.service}
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label
                  value="Sender Email"
                  cssClass="text-gray-400 font-sans"
                />
                <Input
                  required
                  type="email"
                  onChange={handleChange}
                  name="sender_email"
                  value={mailFormValue.sender_email}
                />
              </LabelInputContainer>
            </div>
            <div className="flex flex-row space-x-5">
              <LabelInputContainer>
                <Label
                  value="domainServiceEmail"
                  cssClass="text-gray-400 font-sans"
                />
                <Input
                  required
                  type="email"
                  onChange={handleChange}
                  name="domainServiceEmail"
                  value={mailFormValue.domainServiceEmail}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label value="host" cssClass="text-gray-400 font-sans" />
                <Input
                  required
                  type="text"
                  onChange={handleChange}
                  name="host"
                  value={mailFormValue.host}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label value="port" cssClass="text-gray-400 font-sans" />
                <Input
                  required
                  type="text"
                  onChange={handleChange}
                  name="port"
                  value={mailFormValue.port}
                />
              </LabelInputContainer>
            </div>

            {view[formView]}
            <div className="my-5">
              <button
                type="submit"
                className="bg-white p-2 font-sans font-bold  text-black w-full tracking-widest hover:bg-black hover:text-gray-400 hover:border rounded-2xl"
              >
                {isSpinner ? <Spinner /> : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
