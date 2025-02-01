import { Badge } from "@/components/ui/badge";
import uniqid from "uniqid";
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
  if (visits.filter(filterFn).length === 0) return null;
  return (
    <details className="text-sm italic text-gray-500">
      <summary className="cursor-pointer">{title}</summary>
      <ul className="flex gap-1">
        {visits.filter(filterFn).map((visit) => (
          <Badge key={uniqid()}>{visit.doorNumber}</Badge>
        ))}
      </ul>
    </details>
  );
};

export default SmallDoorsList;
