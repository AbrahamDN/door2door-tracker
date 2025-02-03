// src/utils/statisticsHelper.ts
import { doorStatusOptions } from "@/app/lib/options.constants";
import { Door } from "@/app/context/OutreachContext";

// Define the shape of the Statistics object
export interface Statistic {
  count: number;
  doorIds: string[];
}

// Helper function to calculate statistics
export const calculateStatistics = (doors: Door[]) => {
  const stats = {
    callBacks: { count: 0, doorIds: [] as string[] },
    closed: { count: 0, doorIds: [] as string[] },
    edited: { count: 0, doorIds: [] as string[] },
    notAnswered: { count: 0, doorIds: [] as string[] },
    payerUnavailable: { count: 0, doorIds: [] as string[] },
    pitched: { count: 0, doorIds: [] as string[] },
    successfulCallbacks: { count: 0, doorIds: [] as string[] },
  };

  doors.forEach((door) => {
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

  return stats;
};
