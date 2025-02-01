import { Input } from "@/components/ui/input";
import React from "react";

type DoorNumberInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
};

const DoorNumberInput: React.FC<DoorNumberInputProps> = ({
  onChange,
  placeholder = "Door Number",
  value,
}) => {
  return (
    <Input
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
      required
      type="text"
      value={value}
    />
  );
};

export default DoorNumberInput;
