import React from "react";
import SelectInput from "./SelectInput";
import DoorNumberInput from "./DoorNumberInput";
import { doorStatusOptions, pitchedOptions } from "../constants/optionsData";

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
  return (
    <>
      <DoorNumberInput
        value={doorNumber}
        onChange={(e) => onDoorNumberChange(e.target.value)}
      />
      <SelectInput
        value={status?.value || ""}
        options={doorStatusOptions}
        onChange={(e) => {
          const selectedStatus = doorStatusOptions.find(
            (option) => option.value === e.target.value
          );
          onStatusChange(selectedStatus);
        }}
        placeholder="Select Status"
      />
      {status?.value === "Pitched" && (
        <SelectInput
          value={pitchedOption?.value || ""}
          placeholder="Select Pitched Option"
          options={pitchedOptions}
          onChange={(e) => {
            const selectedOption = pitchedOptions.find(
              (option) => option.value === e.target.value
            );
            onPitchedOptionChange(selectedOption);
          }}
        />
      )}
    </>
  );
};

export default VisitInputs;
