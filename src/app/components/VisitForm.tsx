"use client";
import React, { useState } from "react";
import uniqid from "uniqid";

import { useVisits } from "../context/VisitsContext";
import { OptionsType } from "../lib/options.constants";
import VisitInputs from "./VisitInputs";
import { Button } from "@/components/ui/button";

export type VisitTypes = {
  id: string;
  doorNumber: string;
  status?: OptionsType;
  pitchedOption?: OptionsType;
  createdAt: string;
  modifiedAt?: string;
  successfulCallback?: boolean;
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
      <Button type="submit">Save</Button>
    </form>
  );
};

export default VisitForm;
