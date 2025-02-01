"use client";
import React from "react";
import { useVisits } from "../context/VisitsContext";
import { doorStatusOptions as dso } from "../constants/optionsData";

const VisitAnalytics = () => {
  const { getVisitStatistics } = useVisits();
  const stats = getVisitStatistics();

  return (
    <div className="mt-4">
      <h2>Visit Statistics</h2>
      <ul>
        <li>
          {dso.callback.value}: {stats.callBacks}
        </li>

        <li>
          {dso.closed.value}: {stats.closed}
        </li>

        <li>Edited visits: {stats.modified}</li>

        <li>
          {dso.noAnswer.value}: {stats.notAnswered}
        </li>

        <li>
          {dso.unavailable.value}: {stats.payerUnavailable}
        </li>

        <li>
          {dso.pitched.value}: {stats.pitched}
        </li>

        <li>Successful Callbacks: {stats.successfulCallbacks}</li>
      </ul>
    </div>
  );
};

export default VisitAnalytics;
