"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { VisitTypes } from "../components/VisitForm";
import { doorStatusOptions } from "../constants/optionsData";

interface VisitsContextType {
  visits: VisitTypes[];
  setVisits: React.Dispatch<React.SetStateAction<VisitTypes[]>>;
  editVisit: (
    id: string,
    updatedVisit: Partial<Omit<VisitTypes, "id">>
  ) => void;
  deleteVisit: (id: string) => void;
  getVisitStatistics: () => {
    pitched: number;
    closed: number;
    notAnswered: number;
    payerUnavailable: number;
    callBacks: number;
  };
}

const VisitsContext = createContext<VisitsContextType | undefined>(undefined);

export const VisitsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visits, setVisits] = useState<VisitTypes[]>(() => {
    const storedVisits = localStorage.getItem("visits");
    return storedVisits ? JSON.parse(storedVisits) : [];
  });

  const editVisit = (
    id: string,
    updatedVisit: Partial<Omit<VisitTypes, "id">>
  ) => {
    setVisits((prevVisits) =>
      prevVisits.map((visit) =>
        visit.id === id
          ? { ...visit, ...updatedVisit, modifiedAt: new Date().toISOString() }
          : visit
      )
    );
  };

  const deleteVisit = (id: string) => {
    setVisits((prevVisits) => prevVisits.filter((visit) => visit.id !== id));
  };

  const getVisitStatistics = () => {
    const stats = {
      pitched: 0,
      closed: 0,
      notAnswered: 0,
      payerUnavailable: 0,
      callBacks: 0,
    };

    visits.forEach((visit) => {
      switch (visit.status?.value) {
        case doorStatusOptions.pitched.value:
          stats.pitched++;
          break;
        case doorStatusOptions.closed.value:
          stats.closed++;
          break;
        case doorStatusOptions.noAnswer.value:
          stats.notAnswered++;
          break;
        case doorStatusOptions.unavailable.value:
          stats.payerUnavailable++;
          break;
        case doorStatusOptions.callback.value:
          stats.callBacks++;
          break;
        default:
          break;
      }
    });

    return stats;
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "visits") {
        setVisits(JSON.parse(e.newValue || "[]"));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("visits", JSON.stringify(visits));
  }, [visits]);

  return (
    <VisitsContext.Provider
      value={{ visits, setVisits, editVisit, deleteVisit, getVisitStatistics }}
    >
      {children}
    </VisitsContext.Provider>
  );
};

export const useVisits = () => {
  const context = useContext(VisitsContext);
  if (!context) {
    throw new Error("useVisits must be used within a VisitsProvider");
  }
  return context;
};
