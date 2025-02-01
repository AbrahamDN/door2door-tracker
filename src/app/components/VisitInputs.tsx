import React from "react";
import SelectInput from "./SelectInput";
import DoorNumberInput from "./DoorNumberInput";
import { doorStatusOptions, pitchedOptions } from "../lib/options.constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VisitInputsProps = {
  doorNumber: string;
  status: any;
  pitchedOption: any;
  onDoorNumberChange: (value: string) => void;
  onStatusChange: (value: any) => void;
  onPitchedOptionChange: (value: any) => void;
};

const VisitInputs = ({
  doorNumber,
  status,
  pitchedOption,
  onDoorNumberChange,
  onStatusChange,
  onPitchedOptionChange,
}: VisitInputsProps) => {
  const doorStatusArray = Object.values(doorStatusOptions);
  const pitchedOptionsArray = Object.values(pitchedOptions);

  return (
    <>
      <DoorNumberInput
        value={doorNumber}
        onChange={(e) => onDoorNumberChange(e.target.value)}
      />
      <SelectInput
        value={status?.value || ""}
        options={doorStatusArray}
        onValueChange={(value) => {
          const selectedStatus = doorStatusArray.find(
            (option) => option.value === value
          );
          onStatusChange(selectedStatus);
        }}
        placeholder="Select Status"
        required
      />
      {status?.value === doorStatusOptions.pitched.value && (
        <SelectInput
          value={pitchedOption?.value || ""}
          placeholder="Select Pitched Option"
          options={pitchedOptionsArray}
          onValueChange={(value) => {
            const selectedOption = pitchedOptionsArray.find(
              (option) => option.value === value
            );
            onPitchedOptionChange(selectedOption);
          }}
          required
        />
      )}
    </>
  );
};

export default VisitInputs;
