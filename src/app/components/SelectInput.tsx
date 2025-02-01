import React from "react";
import uniqid from "uniqid";
import { OptionsType } from "../lib/options.constants";
import clsx from "clsx";

type SelectInputProps = {
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: OptionsType[];
  placeholder: string;
  required?: boolean;
  value: string;
};

const SelectInput: React.FC<SelectInputProps> = ({
  className,
  onChange,
  options,
  placeholder,
  required = false,
  value,
}) => {
  return (
    <select
      className={clsx("border p-1", className)}
      onChange={(e) => onChange(e)}
      required={required}
      value={value}
    >
      <option value="">{placeholder}</option>
      {options.map(({ value }) => (
        <option key={uniqid("option")} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
