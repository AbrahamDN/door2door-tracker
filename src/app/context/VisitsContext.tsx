"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { VisitTypes } from "../components/VisitForm";

interface VisitsContextType {
  visits: VisitTypes[];
  setVisits: React.Dispatch<React.SetStateAction<VisitTypes[]>>;
  editVisit: (
    id: string,
    updatedVisit: Partial<Omit<VisitTypes, "id">>
  ) => void;
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
    <VisitsContext.Provider value={{ visits, setVisits, editVisit }}>
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
