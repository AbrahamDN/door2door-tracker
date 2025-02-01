import React, { useState } from "react";

import { VisitTypes } from "./VisitForm";
import { pitchedOptions } from "../constants/optionsData";
import { useVisits } from "../context/VisitsContext";
import VisitInputs from "./VisitInputs";

export type VisitItemTypes = {
  visit: VisitTypes;
};

const VisitItem = ({
  visit: { id, doorNumber, pitchedOption, status },
}: VisitItemTypes) => {
  const { editVisit } = useVisits();
  const [isEditing, setIsEditing] = useState(false);
  const [editedVisit, setEditedVisit] = useState({
    doorNumber,
    status,
    pitchedOption,
  });

  const handleChange = (field: string, value: any) => {
    setEditedVisit((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    editVisit(id, editedVisit);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedVisit({ doorNumber, status, pitchedOption });
    setIsEditing(false);
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
                ? `${pitchedOptions.at(-1)?.icon}${status.icon}`
                : status?.value === "Pitched"
                ? pitchedOption?.icon
                : status?.value}
            </span>
          </>
        )}

        {isEditing ? (
          <div className="flex gap-2 items-end">
            <button onClick={handleSave} className="text-green-500">
              Save
            </button>
            <button onClick={handleCancel} className="text-red-500">
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-500">
            Edit
          </button>
        )}
      </div>
    </li>
  );
};

export default VisitItem;
