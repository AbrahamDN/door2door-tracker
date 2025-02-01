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
import VisitInputs from "./VisitInputs";

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
      <VisitInputs
        doorNumber={doorNumber}
        status={status}
        pitchedOption={pitchedOption}
        onDoorNumberChange={setDoorNumber}
        onStatusChange={setStatus}
        onPitchedOptionChange={setPitchedOption}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default VisitForm;
