"use client";
import React from "react";
import uniqid from "uniqid";

import { useVisits } from "../context/VisitsContext";
import VisitItem from "./VisitItem";
import VisitStats from "./VisitStats";

const VisitList = () => {
  const { visits, clearAll } = useVisits();

  const handleClearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all visits? This action cannot be undone."
      )
    ) {
      clearAll();
    }
  };

  return (
    <div className="mt-4">
      <h2>Visits: {visits.length}</h2>
      <ol className="list-decimal pl-5">
        {visits.map((visit) => (
          <VisitItem key={uniqid("visit")} visit={visit} />
        ))}
      </ol>

      <VisitStats />

      <button
        onClick={handleClearAll}
        className="fixed right-4 bottom-4 bg-red-500 hover:bg-red-600 p-2 rounded-full font-medium text-white"
      >
        Clear all
      </button>
    </div>
  );
};

export default VisitList;
