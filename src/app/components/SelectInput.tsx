import React from "react";
import { OptionsType } from "../lib/options.constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectInputProps = {
  className?: string;
  onValueChange: (value: string) => void;
  options: OptionsType[];
  placeholder: string;
  required?: boolean;
  value: string;
};

const SelectInput: React.FC<SelectInputProps> = ({
  className,
  onValueChange,
  options,
  placeholder,
  required = false,
  value,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange} required={required}>
      <SelectTrigger
        className={`${className} ${!value && required ? "border-red-500" : ""}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value }) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectInput;
