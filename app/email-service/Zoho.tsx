import { FC, useEffect } from "react";
import LabelInputContainer from "../components/ui/LabelInputContainer";
import Label from "../components/Label";
import { Input } from "../components/ui/input";
import { useMailFormContext } from "../store/mailservice";
import { Select } from "../components/ui/Select";
import Link from "next/link";

interface ZohoProps {
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}

const Zoho: FC<ZohoProps> = ({ handleChange }) => {
  const { mailFormValue } = useMailFormContext();

  async function handleGenerate() {
    const res = await fetch("https://accounts.zoho.com/oauth/v2/token", {
      method: "POST",
      headers: {},
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: mailFormValue.ZohoClientId,
        client_secret: mailFormValue.zohoClientSecret,
        redirect_uri: "http://localhost:3000",
        code: mailFormValue.ZohoAuthCode,
      }),
    });
    const resBody = await res.json();
    console.log(resBody);
  }

  return (
    <div>
      <div className="flex flex-row space-x-5">
        <LabelInputContainer>
          <Label
            required
            value="ZohoClientId"
            cssClass="text-gray-400 font-sans"
          />
          <Input
            required
            type="text"
            onChange={handleChange}
            name="ZohoClientId"
            value={mailFormValue.ZohoClientId}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label
            required
            value="zohoClientSecret"
            cssClass="text-gray-400 font-sans"
          />
          <Input
            required
            type="text"
            onChange={handleChange}
            name="zohoClientSecret"
            value={mailFormValue.zohoClientSecret}
          />
        </LabelInputContainer>
      </div>

      <div className="flex flex-row space-x-5">
        <LabelInputContainer>
          <Label
            required
            value="ZohoRefreshToken"
            cssClass="text-gray-400 font-sans"
          />
          <Input
            required
            type="text"
            onChange={handleChange}
            name="ZohoRefreshToken"
            value={mailFormValue.ZohoRefreshToken}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label
            required
            value="zoho_account_id"
            cssClass="text-gray-400 font-sans"
          />
          <Input
            required
            type="text"
            onChange={handleChange}
            name="zoho_account_id"
            value={mailFormValue.zoho_account_id}
          />
        </LabelInputContainer>
      </div>
      {/* <button
        type="button"
        className="bg-gray-400 text-black px-3 rounded-2xl"
        onClick={handleGenerate}
      >
        generate
      </button> */}
      <div className="flex flex-row space-x-5">
        {/* <LabelInputContainer>
          <Label value="isDkim" cssClass="text-gray-400 font-sans" />
          <Select
            options={["true", "false"]}
            onChange={handleChange}
            name="isDkim"
            value={mailFormValue.isDkim}
            required
          />
        </LabelInputContainer> */}
        <LabelInputContainer>
          <Label value="ZohoAuthCode" cssClass="text-gray-400 font-sans" />
          <Input
            required
            type="text"
            onChange={handleChange}
            name="ZohoAuthCode"
            value={mailFormValue.ZohoAuthCode}
          />
        </LabelInputContainer>
      </div>
    </div>
  );
};

export default Zoho;
