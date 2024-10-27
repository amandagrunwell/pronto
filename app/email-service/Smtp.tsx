import { FC } from "react";
import LabelInputContainer from "../components/ui/LabelInputContainer";
import Label from "../components/Label";
import { Input } from "../components/ui/input";
import { useMailFormContext } from "../store/mailservice";
import { Select } from "../components/ui/Select";

interface SmtpProps {
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}

const Smtp: FC<SmtpProps> = ({ handleChange }) => {
  const { mailFormValue } = useMailFormContext();
  return (
    <div>
      <div className="flex flex-row space-x-5">
        <LabelInputContainer>
          <Label required value="domain" cssClass="text-gray-400 font-sans" />
          <Input
            required
            type="text"
            onChange={handleChange}
            name="domain"
            value={mailFormValue.domain}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label required value="Password" cssClass="text-gray-400 font-sans" />
          <Input
            required
            type="text"
            onChange={handleChange}
            name="sender_password"
            value={mailFormValue.sender_password}
          />
        </LabelInputContainer>
      </div>
    </div>
  );
};

export default Smtp;
