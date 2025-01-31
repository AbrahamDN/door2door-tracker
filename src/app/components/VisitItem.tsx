import React, { useState } from "react";

import { VisitTypes } from "./VisitForm";
import { pitchedOptions, doorStatusOptions } from "../constants/optionsData";
import { useVisits } from "../context/VisitsContext";

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
          <>
            <input
              type="text"
              value={editedVisit.doorNumber}
              onChange={(e) => handleChange("doorNumber", e.target.value)}
              className="border p-1"
            />
            <select
              value={editedVisit.status?.value || ""}
              onChange={(e) => {
                const selectedStatus = doorStatusOptions.find(
                  (option) => option.value === e.target.value
                );
                handleChange("status", selectedStatus);
              }}
              className="border p-1"
            >
              <option value="">Select Status</option>
              {doorStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
            {editedVisit.status?.value === "Pitched" && (
              <select
                value={editedVisit.pitchedOption?.value || ""}
                onChange={(e) => {
                  const selectedOption = pitchedOptions.find(
                    (option) => option.value === e.target.value
                  );
                  handleChange("pitchedOption", selectedOption);
                }}
                className="border p-1"
              >
                <option value="">Select Pitched Option</option>
                {pitchedOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            )}
          </>
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
          <>
            <button onClick={handleSave} className="text-green-500">
              Save
            </button>
            <button onClick={handleCancel} className="text-red-500">
              Cancel
            </button>
          </>
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
