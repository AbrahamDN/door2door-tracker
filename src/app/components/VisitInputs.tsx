import {
  doorStatusOptions,
  OptionsType,
  pitchedOptions,
} from "../lib/options.constants";
import DoorNumberInput from "./DoorNumberInput";
import SelectInput from "./SelectInput";

type VisitInputsProps = {
  doorNumber: string;
  status: OptionsType | undefined;
  pitchedOption: OptionsType | undefined;
  onDoorNumberChange: (value: string) => void;
  onStatusChange: (value?: OptionsType | undefined) => void;
  onPitchedOptionChange: (value?: OptionsType | undefined) => void;
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
