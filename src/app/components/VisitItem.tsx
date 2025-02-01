import React, { useState } from "react";

import { VisitTypes } from "./VisitForm";
import { doorStatusOptions, pitchedOptions } from "../lib/options.constants";
import { useVisits } from "../context/VisitsContext";
import VisitInputs from "./VisitInputs";
import { Button } from "@/components/ui/button";

export type VisitItemTypes = {
  visit: VisitTypes;
};

const VisitItem = ({
  visit: { id, doorNumber, pitchedOption, status },
}: VisitItemTypes) => {
  const { editVisit, deleteVisit } = useVisits();
  const [isEditing, setIsEditing] = useState(false);
  const [editedVisit, setEditedVisit] = useState({
    doorNumber,
    status,
    pitchedOption,
  });

  const handleChange = (
    field: keyof typeof editedVisit,
    value: (typeof editedVisit)[keyof typeof editedVisit]
  ) => {
    setEditedVisit((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    editVisit(id, {
      ...editedVisit,
      modifiedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedVisit({ doorNumber, status, pitchedOption });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this visit?")) {
      deleteVisit(id);
    }
  };

  return (
    <li className="mb-2">
      <div className="grid grid-cols-3 gap-2">
        {isEditing ? (
          <VisitInputs
            doorNumber={editedVisit.doorNumber}
            status={editedVisit.status}
            pitchedOption={editedVisit.pitchedOption}
            onDoorNumberChange={(value) => handleChange("doorNumber", value)}
            onStatusChange={(value) => handleChange("status", value)}
            onPitchedOptionChange={(value) =>
              handleChange("pitchedOption", value)
            }
          />
        ) : (
          <>
            <span className="font-bold">{doorNumber}</span>
            <span>
              {status?.closed
                ? `${Object.values(pitchedOptions).at(-1)?.icon}${status.icon}`
                : status?.value === doorStatusOptions.pitched.value
                ? pitchedOption?.icon
                : status?.value}
            </span>
          </>
        )}

        {isEditing ? (
          <div className="flex gap-2 items-end">
            <Button onClick={handleSave} className="bg-green-500">
              Save
            </Button>
            <Button onClick={handleCancel} className="bg-red-500">
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 items-end">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500"
            >
              Edit
            </button>
            <button onClick={handleDelete} className="text-red-500">
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default VisitItem;
