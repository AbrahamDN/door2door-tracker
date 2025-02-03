"use client";
import { useVisits } from "../context/VisitsContext";
import { doorStatusOptions as dso } from "../lib/options.constants";
import { VisitTypes } from "./VisitForm";
import VisitStatTable from "./VisitStatTable";

const VisitStats = () => {
  const { visits } = useVisits();

  // Define the rows for the table
  const tableRows = [
    {
      label: dso.callback.value,
      filterFn: (visit: VisitTypes) =>
        visit.status?.value === dso.callback.value,
    },
    {
      label: dso.closed.value,
      filterFn: (visit: VisitTypes) => visit.status?.value === dso.closed.value,
    },
    {
      label: "Edited visits",
      filterFn: (visit: VisitTypes) => Boolean(visit.modifiedAt),
    },
    {
      label: dso.noAnswer.value,
      filterFn: (visit: VisitTypes) =>
        visit.status?.value === dso.noAnswer.value,
    },
    {
      label: dso.unavailable.value,
      filterFn: (visit: VisitTypes) =>
        visit.status?.value === dso.unavailable.value,
    },
    {
      label: dso.pitched.value,
      filterFn: (visit: VisitTypes) =>
        visit.status?.value === dso.pitched.value,
    },
    {
      label: "Successful Callbacks",
      filterFn: (visit: VisitTypes) => Boolean(visit.successfulCallback),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Visit Statistics</h2>
      <VisitStatTable rows={tableRows} visits={visits} />
    </div>
  );
};

export default VisitStats;
