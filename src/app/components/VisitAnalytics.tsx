"use client";
import React from "react";
import { useVisits } from "../context/VisitsContext";

const VisitAnalytics = () => {
  const { getVisitStatistics } = useVisits();
  const stats = getVisitStatistics();

  return (
    <div className="mt-4">
      <h2>Visits Statistics</h2>
      <ul>
        <li>Pitched: {stats.pitched}</li>
        <li>Closed: {stats.closed}</li>
        <li>Not Answered: {stats.notAnswered}</li>
        <li>Payer Unavailable: {stats.payerUnavailable}</li>
        <li>Callbacks: {stats.callBacks}</li>
      </ul>
    </div>
  );
};

export default VisitAnalytics;
