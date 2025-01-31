"use client";
import React, { useState } from "react";
import uniqid from "uniqid";

import { useVisits } from "../context/VisitsContext";
import {
  doorStatusOptions,
  OptionsType,
  pitchedOptions,
} from "../constants/optionsData";

export type VisitTypes = {
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
      <input
        type="text"
        value={doorNumber}
        onChange={(e) => setDoorNumber(e.target.value)}
        placeholder="Door Number"
        required
      />
      <select
        value={status?.value || ""}
        onChange={(e) => {
          const selectedStatus = doorStatusOptions.find(
            (option) => option.value === e.target.value
          );
          setStatus(selectedStatus);
        }}
        required
      >
        <option value="">Select Status</option>
        {doorStatusOptions.map((option, index) => (
          <option key={uniqid("status")} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      {status?.value === "Pitched" && (
        <select
          value={pitchedOption?.value || ""}
          onChange={(e) => {
            const selectedOption = pitchedOptions.find(
              (option) => option.value === e.target.value
            );
            setPitchedOption(selectedOption);
          }}
        >
          <option value="">Select Pitched Option</option>
          {pitchedOptions.map((option, index) => (
            <option key={uniqid("pitch")} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      )}
      <button type="submit">Save</button>
    </form>
  );
};

export default VisitForm;
