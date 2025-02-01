import uniqid from "uniqid";
import Pill from "./Pill";
import { VisitTypes } from "./VisitForm";

interface SmallDoorsListProps {
  filterFn?: (visit: VisitTypes) => boolean;
  title?: string;
  visits: VisitTypes[];
}

const SmallDoorsList = ({
  filterFn = (visit) => visit.successfulCallback as boolean,
  title = "View Doors",
  visits,
}: SmallDoorsListProps) => {
  return (
    <details className="text-sm italic text-gray-500">
      <summary className="cursor-pointer">{title}</summary>
      <ul className="flex gap-1">
        {visits.filter(filterFn).map((visit) => (
          <Pill key={uniqid()}>{visit.doorNumber}</Pill>
        ))}
      </ul>
    </details>
  );
};

export default SmallDoorsList;
