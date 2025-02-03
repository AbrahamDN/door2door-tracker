// src/context/OutreachContext.tsx
import { OptionsType } from "@/app/lib/options.constants";
import { calculateStatistics, Statistic } from "@/app/utils/statisticsHelper";
import { debounce } from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import uniqid from "uniqid";
import { z } from "zod";

// Define the shape of a Door object
export interface Door {
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

// Validation schema for Door data
const doorSchema = z.object({
  doorNumber: z.string().min(1, "Door number is required"),
  postcodePrefix: z.string().min(1, "Postcode prefix is required"),
  streetName: z.string().optional(),
  status: z
    .object({
      value: z.string(),
      icon: z.string(),
      closed: z.boolean().optional(),
    })
    .optional(),
  prevStatus: z
    .object({
      value: z.string(),
      icon: z.string(),
      closed: z.boolean().optional(),
    })
    .optional(),
  pitchedProgress: z
    .object({
      value: z.string(),
      icon: z.string(),
    })
    .optional(),
  successfulCallback: z.boolean().optional(),
});

// Default outreach object
const defaultOutreach: Outreach = {
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

// Create the context
const OutreachContext = createContext({
  outreach: defaultOutreach,
  updatePostCodePrefix: (_postCodePrefix: string) => {},
  addDoor: (_door: Omit<Door, "id" | "createdAt">) => {},
  updateDoor: (_id: string, _updatedData: Partial<Door>) => {},
  deleteDoor: (_id: string) => {},
  resetOutreach: () => {},
});

// Custom hook to use the context
export const useOutreach = () => {
  return useContext(OutreachContext);
};

// Provider component
export const OutreachProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize state with fallback for localStorage errors
  const getInitialOutreach = (): Outreach => {
    try {
      const savedOutreach = localStorage.getItem("outreach");
      if (savedOutreach) {
        return JSON.parse(savedOutreach);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
    return defaultOutreach;
  };

  const [outreach, setOutreach] = useState<Outreach>(getInitialOutreach);

  // Update localStorage whenever the outreach state changes
  useEffect(() => {
    const throttledSaveToLocalStorage = debounce(() => {
      try {
        localStorage.setItem("outreach", JSON.stringify(outreach));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }, 500); // Throttle for 500ms

    throttledSaveToLocalStorage();

    return () => {
      throttledSaveToLocalStorage.cancel(); // Clean up throttle on unmount
    };
  }, [outreach]);

  // Debounced statistics calculation
  useEffect(() => {
    const debouncedUpdateStatistics = debounce(() => {
      const updatedStatistics = calculateStatistics(outreach.doors);
      setOutreach((prev) => ({
        ...prev,
        statistics: updatedStatistics,
      }));
    }, 300); // Debounce for 300ms

    debouncedUpdateStatistics();

    return () => {
      debouncedUpdateStatistics.cancel(); // Clean up debounce on unmount
    };
  }, [outreach.doors]);

  // Function to update the postCodePrefix
  const updatePostCodePrefix = (postCodePrefix: string) => {
    setOutreach((prev) => ({ ...prev, postCodePrefix }));
  };

  // Function to add a new door with validation
  const addDoor = (door: Omit<Door, "id" | "createdAt">) => {
    const validationResult = doorSchema.safeParse(door);
    if (!validationResult.success) {
      console.error("Invalid door data:", validationResult.error);
      return;
    }

    const newDoor: Door = {
      id: uniqid(),
      createdAt: new Date().toISOString(),
      ...door,
    };

    setOutreach((prev) => {
      if (prev.doors.some((d) => d.id === newDoor.id)) {
        console.warn("Duplicate door ID detected. Skipping update.");
        return prev; // Prevent duplicate updates
      }
      return {
        ...prev,
        doors: [...prev.doors, newDoor],
      };
    });
  };

  // Function to update a specific door
  const updateDoor = (id: string, updatedData: Partial<Door>) => {
    setOutreach((prev) => {
      const updatedDoors = prev.doors.map((door) =>
        door.id === id
          ? {
              ...door,
              ...updatedData,
              editedAt: new Date().toISOString(),
            }
          : door
      );

      // Avoid updating if no changes were made
      if (JSON.stringify(prev.doors) === JSON.stringify(updatedDoors)) {
        return prev;
      }

      return {
        ...prev,
        doors: updatedDoors,
      };
    });
  };

  // Function to delete a specific door
  const deleteDoor = (id: string) => {
    setOutreach((prev) => {
      const updatedDoors = prev.doors.filter((door) => door.id !== id);

      // Avoid updating if no changes were made
      if (JSON.stringify(prev.doors) === JSON.stringify(updatedDoors)) {
        return prev;
      }

      return {
        ...prev,
        doors: updatedDoors,
      };
    });
  };

  // Function to reset the entire outreach object
  const resetOutreach = () => {
    setOutreach(defaultOutreach);
  };

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
