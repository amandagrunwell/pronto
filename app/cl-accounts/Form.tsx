import { FC, useState } from "react";
import LabelInputContainer from "../components/ui/LabelInputContainer";
import Label from "../components/Label";
import { Input } from "../components/ui/input";
import { useClFormContext } from "../store/clAccounts";

interface FormProps {}

const Form: FC<FormProps> = ({}) => {
  const { formValue, setFormValue } = useClFormContext();
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  function handleSubmit() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setIsSpinner(true);

      try {
        const response = await fetch("/api/email-service", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValue),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.status.toString().startsWith("2")) {
          const formData = {};
          // const updatedInfos = [...allMailService, formData];
          // setMailService(updatedInfos);
          // setFilteredMailService(updatedInfos);
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
  }
  function handleChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        className=" flex flex-col space-y-5 border border-gray-200 p-5 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row space-x-5">
          <LabelInputContainer>
            <Label value="Name" cssClass="text-gray-400 font-sans" />
            <Input
              required
              type="text"
              onChange={handleChange}
              name="name"
              value={formValue.name}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label value="Email" cssClass="text-gray-400 font-sans" />
            <Input
              required
              type="email"
              onChange={handleChange}
              name="email"
              value={formValue.email}
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-row space-x-5">
          <LabelInputContainer>
            <Label value="Bank Name" cssClass="text-gray-400 font-sans" />
            <Input
              required
              type="text"
              onChange={handleChange}
              name="bankName"
              value={formValue.bankName}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label value="routing" cssClass="text-gray-400 font-sans" />
            <Input
              required
              type="text"
              onChange={handleChange}
              name="routing"
              value={formValue.routing}
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-row space-x-5">
          <LabelInputContainer>
            <Label value="Account Number" cssClass="text-gray-400 font-sans" />
            <Input
              required
              type="text"
              onChange={handleChange}
              name="accountNumber"
              value={formValue.accountNumber}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label value="Account Type" cssClass="text-gray-400 font-sans" />
            <Input
              required
              type="text"
              onChange={handleChange}
              name="accountType"
              value={formValue.accountType}
            />
          </LabelInputContainer>
        </div>
        <div className="flex flex-row space-x-5">
          <LabelInputContainer>
            <Label value="Account Level" cssClass="text-gray-400 font-sans" />
            <Input
              required
              type="text"
              onChange={handleChange}
              name="accountLevel"
              value={formValue.accountLevel}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label value="Amount" cssClass="text-gray-400 font-sans" />
            <Input
              required
              type="text"
              onChange={handleChange}
              name="amount"
              value={formValue.amount}
            />
          </LabelInputContainer>
        </div>
        <button
          type="submit"
          className="rounded-3xl bg-gray-200 hover:bg-black hover:text-white text-black p-3 hover:border transition-all duration-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
