"use client";
import uniqid from "uniqid";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useVisits } from "../context/VisitsContext";
import VisitItem from "./VisitItem";

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
      <h2>Total: {visits.length}</h2>
      <ol className="list-decimal pl-5">
        {visits.map((visit) => (
          <VisitItem key={uniqid("visit")} visit={visit} />
        ))}
      </ol>

      <Button
        onClick={handleClearAll}
        className="fixed right-4 bottom-4"
        variant="destructive"
      >
        Clear all <TrashIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default VisitList;
