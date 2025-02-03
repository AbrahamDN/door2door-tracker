import React from "react";
import { VisitTypes } from "./VisitForm";
import SmallDoorsList from "./SmallDoorList";

interface TableRow {
  label: string;
  filterFn: (visit: VisitTypes) => boolean;
}

interface VisitStatTableProps {
  rows: TableRow[];
  visits: VisitTypes[];
}

const VisitStatTable: React.FC<VisitStatTableProps> = ({ rows, visits }) => {
  return (
    <div className="rounded-md border">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Count
            </th>
            <th scope="col" className="px-6 py-3">
              Doors List
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const filteredVisits = visits.filter(row.filterFn);
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {row.label}
                </td>
                <td className="px-6 py-4">{filteredVisits.length}</td>
                <td className="px-6 py-4">
                  <SmallDoorsList visits={filteredVisits} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VisitStatTable;
