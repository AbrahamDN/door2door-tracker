"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { VisitTypes } from "../components/VisitForm";
import { doorStatusOptions } from "../lib/options.constants";

interface VisitStorage {
  visits: VisitTypes[];
  statistics: {
    pitched: number;
    closed: number;
    notAnswered: number;
    payerUnavailable: number;
    callBacks: number;
    modified: number;
    successfulCallbacks: number;
  };
  createdAt: string;
}

interface Visit {
  visits: VisitTypes[];
  statistics: {
    pitched: number;
    closed: number;
    notAnswered: number;
    payerUnavailable: number;
    callBacks: number;
    modified: number;
    successfulCallbacks: number;
  };
  createdAt: string;
}

interface VisitsContextType {
  visits: VisitTypes[];
  visit: Visit;
  setVisits: React.Dispatch<React.SetStateAction<VisitTypes[]>>;
  setVisit: React.Dispatch<React.SetStateAction<Visit>>;
  editVisit: (
    id: string,
    updatedVisit: Partial<Omit<VisitTypes, "id">>
  ) => void;
  deleteVisit: (id: string) => void;
  getVisitStatistics: () => Visit["statistics"];
  clearAll: () => void;
}

const VisitsContext = createContext<VisitsContextType | undefined>(undefined);

export const VisitsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visit, setVisit] = useState<Visit>(() => {
    const stored = localStorage.getItem("visit");
    return stored
      ? JSON.parse(stored)
      : {
          visits: [],
          statistics: {
            pitched: 0,
            closed: 0,
            notAnswered: 0,
            payerUnavailable: 0,
            callBacks: 0,
            modified: 0,
            successfulCallbacks: 0,
          },
          createdAt: new Date().toISOString(),
        };
  });

  const [currentVisit, setCurrentVisit] = useState<Visit>(() => {
    const stored = localStorage.getItem("currentVisit");
    return stored
      ? JSON.parse(stored)
      : {
          visits: [],
          statistics: {
            pitched: 0,
            closed: 0,
            notAnswered: 0,
            payerUnavailable: 0,
            callBacks: 0,
            modified: 0,
            successfulCallbacks: 0,
          },
          createdAt: new Date().toISOString(),
        };
  });

  const setVisits = (
    visitsOrUpdater: VisitTypes[] | ((prev: VisitTypes[]) => VisitTypes[])
  ) => {
    setVisit((prev) => ({
      ...prev,
      visits:
        typeof visitsOrUpdater === "function"
          ? visitsOrUpdater(prev.visits)
          : visitsOrUpdater,
    }));
  };

  const editVisit = (
    id: string,
    updatedVisit: Partial<Omit<VisitTypes, "id">>
  ) => {
    setVisits((prevVisits) =>
      prevVisits.map((visit) => {
        if (visit.id === id) {
          const isClosed =
            updatedVisit.status?.value === doorStatusOptions.closed.value;
          const wasCallback =
            visit.status?.value === doorStatusOptions.callback.value;

          return {
            ...visit,
            ...updatedVisit,
            lastStatus: visit.status,
            modifiedAt: new Date().toISOString(),
            successfulCallback: wasCallback && isClosed ? true : undefined,
          };
        }
        return visit;
      })
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
      modified: 0,
      successfulCallbacks: 0,
    };

    visit.visits.forEach((visit) => {
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
      if (visit.modifiedAt) {
        stats.modified++;
      }
      if (visit.successfulCallback) {
        stats.successfulCallbacks++;
      }
    });

    return stats;
  };

  const clearAll = () => {
    setVisit((prev) => ({
      ...prev,
      visits: [],
      statistics: {
        pitched: 0,
        closed: 0,
        notAnswered: 0,
        payerUnavailable: 0,
        callBacks: 0,
        modified: 0,
        successfulCallbacks: 0,
      },
    }));
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "visit") {
        setVisit(
          JSON.parse(
            e.newValue ||
              JSON.stringify({
                visits: [],
                statistics: getVisitStatistics(),
                createdAt: new Date().toISOString(),
              })
          )
        );
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "visit",
      JSON.stringify({
        ...visit,
        statistics: getVisitStatistics(),
      })
    );
  }, [visit.visits]);

  useEffect(() => {
    localStorage.setItem(
      "currentVisit",
      JSON.stringify({
        ...currentVisit,
        statistics: getVisitStatistics(),
      })
    );
  }, [currentVisit.visits]);

  return (
    <VisitsContext.Provider
      value={{
        visits: visit.visits,
        visit: currentVisit,
        setVisits,
        setVisit: setCurrentVisit,
        editVisit,
        deleteVisit,
        getVisitStatistics,
        clearAll,
      }}
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
