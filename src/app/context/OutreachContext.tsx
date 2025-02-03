import React, { createContext, useContext, useState, useEffect } from "react";
import uniqid from "uniqid";
import {
  doorStatusOptions,
  pitchedOptions,
  OptionsType,
} from "@/app/lib/options.constants";

// Define the shape of a Door object
interface Door {
  id: string;
  createdAt: Date | string;
  editedAt?: Date | string;
  doorNumber: string;
  postcodePrefix: string;
  streetName?: string;
  status?: OptionsType;
  prevStatus?: OptionsType;
  pitchedProgress?: OptionsType;
  successfulCallback?: boolean;
}

// Define the shape of the Statistics object
interface Statistic {
  count: number;
  doorIds: string[];
}

// Define the shape of the Outreach object
interface Outreach {
  id: string;
  createdAt: Date | string;
  postCodePrefix: string;
  doors: Door[];
  statistics: {
    callBacks: Statistic;
    closed: Statistic;
    edited: Statistic;
    notAnswered: Statistic;
    payerUnavailable: Statistic;
    pitched: Statistic;
    successfulCallbacks: Statistic;
  };
}

// Create the context
const OutreachContext = createContext<{
  outreach: Outreach;
  updatePostCodePrefix: (postCodePrefix: string) => void;
  addDoor: (door: Omit<Door, "id" | "createdAt">) => void;
  updateDoor: (id: string, updatedData: Partial<Door>) => void;
  deleteDoor: (id: string) => void;
  resetOutreach: () => void;
} | null>(null);

// Custom hook to use the context
export const useOutreach = () => {
  const context = useContext(OutreachContext);
  if (!context) {
    throw new Error("useOutreach must be used within an OutreachProvider");
  }
  return context;
};

// Provider component
export const OutreachProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize state from localStorage or default to a new outreach object
  const [outreach, setOutreach] = useState<Outreach>(() => {
    const savedOutreach = localStorage.getItem("outreach");
    if (savedOutreach) {
      return JSON.parse(savedOutreach);
    }
    return {
      id: uniqid(),
      createdAt: new Date().toISOString(),
      postCodePrefix: "",
      doors: [],
      statistics: {
        callBacks: { count: 0, doorIds: [] },
        closed: { count: 0, doorIds: [] },
        edited: { count: 0, doorIds: [] },
        notAnswered: { count: 0, doorIds: [] },
        payerUnavailable: { count: 0, doorIds: [] },
        pitched: { count: 0, doorIds: [] },
        successfulCallbacks: { count: 0, doorIds: [] },
      },
    };
  });

  // Update localStorage whenever the outreach state changes
  useEffect(() => {
    localStorage.setItem("outreach", JSON.stringify(outreach));
  }, [outreach]);

  // Function to update the postCodePrefix
  const updatePostCodePrefix = (postCodePrefix: string) => {
    setOutreach((prev) => ({ ...prev, postCodePrefix }));
  };

  // Function to add a new door
  const addDoor = (door: Omit<Door, "id" | "createdAt">) => {
    const newDoor: Door = {
      id: uniqid(),
      createdAt: new Date().toISOString(),
      ...door,
    };
    setOutreach((prev) => ({
      ...prev,
      doors: [...prev.doors, newDoor],
    }));
  };

  // Function to update a specific door
  const updateDoor = (id: string, updatedData: Partial<Door>) => {
    setOutreach((prev) => ({
      ...prev,
      doors: prev.doors.map((door) =>
        door.id === id
          ? {
              ...door,
              ...updatedData,
              editedAt: new Date().toISOString(),
            }
          : door
      ),
    }));
  };

  // Function to delete a specific door
  const deleteDoor = (id: string) => {
    setOutreach((prev) => ({
      ...prev,
      doors: prev.doors.filter((door) => door.id !== id),
    }));
  };

  // Function to reset the entire outreach object
  const resetOutreach = () => {
    setOutreach({
      id: uniqid(),
      createdAt: new Date().toISOString(),
      postCodePrefix: "",
      doors: [],
      statistics: {
        callBacks: { count: 0, doorIds: [] },
        closed: { count: 0, doorIds: [] },
        edited: { count: 0, doorIds: [] },
        notAnswered: { count: 0, doorIds: [] },
        payerUnavailable: { count: 0, doorIds: [] },
        pitched: { count: 0, doorIds: [] },
        successfulCallbacks: { count: 0, doorIds: [] },
      },
    });
  };

  // Automatically calculate statistics based on the doors array
  useEffect(() => {
    const calculateStatistics = () => {
      const stats = {
        callBacks: { count: 0, doorIds: [] as string[] },
        closed: { count: 0, doorIds: [] as string[] },
        edited: { count: 0, doorIds: [] as string[] },
        notAnswered: { count: 0, doorIds: [] as string[] },
        payerUnavailable: { count: 0, doorIds: [] as string[] },
        pitched: { count: 0, doorIds: [] as string[] },
        successfulCallbacks: { count: 0, doorIds: [] as string[] },
      };

      outreach.doors.forEach((door) => {
        if (door.status?.value === doorStatusOptions.callback.value) {
          stats.callBacks.count++;
          stats.callBacks.doorIds.push(door.id);
        }
        if (door.status?.closed) {
          stats.closed.count++;
          stats.closed.doorIds.push(door.id);
        }
        if (door.editedAt) {
          stats.edited.count++;
          stats.edited.doorIds.push(door.id);
        }
        if (door.status?.value === doorStatusOptions.noAnswer.value) {
          stats.notAnswered.count++;
          stats.notAnswered.doorIds.push(door.id);
        }
        if (door.status?.value === doorStatusOptions.unavailable.value) {
          stats.payerUnavailable.count++;
          stats.payerUnavailable.doorIds.push(door.id);
        }
        if (door.status?.value === doorStatusOptions.pitched.value) {
          stats.pitched.count++;
          stats.pitched.doorIds.push(door.id);
        }
        if (
          door.prevStatus?.value === doorStatusOptions.callback.value &&
          door.status?.value === doorStatusOptions.closed.value
        ) {
          stats.successfulCallbacks.count++;
          stats.successfulCallbacks.doorIds.push(door.id);
        }
      });

      setOutreach((prev) => ({
        ...prev,
        statistics: stats,
      }));
    };

    calculateStatistics();
  }, [outreach.doors]);

  return (
    <OutreachContext.Provider
      value={{
        outreach,
        updatePostCodePrefix,
        addDoor,
        updateDoor,
        deleteDoor,
        resetOutreach,
      }}
    >
      {children}
    </OutreachContext.Provider>
  );
};
