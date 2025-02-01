import React from "react";
import { VisitTypes } from "./VisitForm";
import SmallDoorsList from "./SmallDoorList";

interface VisitStatProps {
  label: string;
  count: number;
  visits: VisitTypes[];
  doorsListTitle?: string;
  filterFn: (visit: VisitTypes) => boolean;
}

const VisitStat: React.FC<VisitStatProps> = ({
  label,
  count,
  visits,
  doorsListTitle,
  filterFn,
}) => {
  return (
    <li className="grid grid-cols-2 gap-2">
      <span>
        {label}: {count}
      </span>
      <SmallDoorsList
        visits={visits}
        title={doorsListTitle}
        filterFn={filterFn}
      />
    </li>
  );
};

export default VisitStat;
