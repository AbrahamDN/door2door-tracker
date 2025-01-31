"use client";
import React from "react";
import uniqid from "uniqid";

import { useVisits } from "../context/VisitsContext";
import VisitItem from "./VisitItem";

const VisitList = () => {
  const { visits } = useVisits();

  return (
    <div className="mt-4">
      <h2>Visits: {visits.length}</h2>
      <ol className="list-decimal pl-5">
        {visits.map((visit) => (
          <VisitItem key={uniqid("visit")} visit={visit} />
        ))}
      </ol>
    </div>
  );
};

export default VisitList;
