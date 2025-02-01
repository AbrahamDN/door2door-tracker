"use client";
import React, { useState } from "react";
import uniqid from "uniqid";

import { useVisits } from "../context/VisitsContext";
import {
  doorStatusOptions,
  OptionsType,
  pitchedOptions,
} from "../constants/optionsData";
import SelectInput from "./SelectInput";
import DoorNumberInput from "./DoorNumberInput";

export type VisitTypes = {
  id: string;
  doorNumber: string;
  status?: OptionsType;
  pitchedOption?: OptionsType;
  createdAt: string;
};

const VisitForm = () => {
  const [doorNumber, setDoorNumber] = useState("");
  const [status, setStatus] = useState<OptionsType>();
  const [pitchedOption, setPitchedOption] = useState<OptionsType>();
  const { setVisits } = useVisits();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const visitData: VisitTypes = {
      id: uniqid("v-"),
      doorNumber,
      status: status,
      pitchedOption: pitchedOption,
      createdAt: new Date().toISOString(),
    };

    setVisits((prevVisits) => [...prevVisits, visitData]);
    resetForm();
  };

  const resetForm = () => {
    setDoorNumber("");
    setStatus(undefined);
    setPitchedOption(undefined);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DoorNumberInput
        value={doorNumber}
        onChange={(e) => setDoorNumber(e.target.value)}
      />
      <SelectInput
        value={status?.value || ""}
        options={doorStatusOptions}
        onChange={(e) => {
          const selectedStatus = doorStatusOptions.find(
            (option) => option.value === e.target.value
          );
          setStatus(selectedStatus);
        }}
        placeholder="Select Status"
        required
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
            setPitchedOption(selectedOption);
          }}
        />
      )}
      <button type="submit">Save</button>
    </form>
  );
};

export default VisitForm;
