"use client";
import { doorStatusOptions as dso } from "../constants/optionsData";
import { useVisits } from "../context/VisitsContext";
import VisitStat from "./VisitStat";

const VisitStats = () => {
  const { getVisitStatistics, visits } = useVisits();
  const stats = getVisitStatistics();

  return (
    <div className="mt-4">
      <h2>Visit Statistics</h2>
      <ul className="flex flex-col divide-y-2">
        <VisitStat
          count={stats.callBacks}
          doorsListTitle="Callback Doors"
          filterFn={(visit) => visit.status?.value === dso.callback.value}
          label={dso.callback.value}
          visits={visits}
        />
        <VisitStat
          count={stats.closed}
          doorsListTitle="Closed Doors"
          filterFn={(visit) => visit.status?.value === dso.closed.value}
          label={dso.closed.value}
          visits={visits}
        />
        <VisitStat
          count={stats.modified}
          doorsListTitle="Edited Doors"
          filterFn={(visit) => Boolean(visit.modifiedAt)}
          label="Edited visits"
          visits={visits}
        />
        <VisitStat
          count={stats.notAnswered}
          doorsListTitle="No Answer Doors"
          filterFn={(visit) => visit.status?.value === dso.noAnswer.value}
          label={dso.noAnswer.value}
          visits={visits}
        />
        <VisitStat
          count={stats.payerUnavailable}
          doorsListTitle="Unavailable Doors"
          filterFn={(visit) => visit.status?.value === dso.unavailable.value}
          label={dso.unavailable.value}
          visits={visits}
        />
        <VisitStat
          count={stats.pitched}
          doorsListTitle="Pitched Doors"
          filterFn={(visit) => visit.status?.value === dso.pitched.value}
          label={dso.pitched.value}
          visits={visits}
        />
        <VisitStat
          count={stats.successfulCallbacks}
          doorsListTitle="Successful Doors"
          filterFn={(visit) => Boolean(visit.successfulCallback)}
          label="Successful Callbacks"
          visits={visits}
        />
      </ul>
    </div>
  );
};

export default VisitStats;
