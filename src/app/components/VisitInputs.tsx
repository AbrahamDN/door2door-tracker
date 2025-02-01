import React from "react";
import SelectInput from "./SelectInput";
import DoorNumberInput from "./DoorNumberInput";
import { doorStatusOptions, pitchedOptions } from "../lib/options.constants";

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
        onChange={(e) => {
          const selectedStatus = doorStatusArray.find(
            (option) => option.value === e.target.value
          );
          onStatusChange(selectedStatus);
        }}
        placeholder="Select Status"
      />
      {status?.value === doorStatusOptions.pitched.value && (
        <SelectInput
          value={pitchedOption?.value || ""}
          placeholder="Select Pitched Option"
          options={pitchedOptionsArray}
          onChange={(e) => {
            const selectedOption = pitchedOptionsArray.find(
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
