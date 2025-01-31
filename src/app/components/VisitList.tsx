"use client";

import React from "react";
import uniqid from "uniqid";

import { useVisits } from "../context/VisitsContext";
import { OptionsType, pitchedOptions } from "../constants/optionsData";

const VisitList = () => {
  const { visits } = useVisits();

  const handleClosedString = (status: OptionsType) => {
    if (!status?.closed) return;
    return `${pitchedOptions.at(-1)?.icon} ${status.icon}`;
  };

  return (
    <div className="mt-4">
      <h2>Visits: {visits.length}</h2>
      <ol className="list-decimal pl-5">
        {visits.map(({ doorNumber, pitchedOption, status }) => (
          <li key={uniqid("visit")} className="mb-2">
            <div className="grid grid-cols-3 gap-2">
              <span className="font-bold">{doorNumber}</span>

              {pitchedOption ? (
                <span>{pitchedOption.icon || pitchedOption.value}</span>
              ) : (
                status && (
                  <span>
                    {status.closed ? handleClosedString(status) : status.value}
                  </span>
                )
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default VisitList;
