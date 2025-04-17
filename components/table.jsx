'use client';
import React from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function Table(props) {
  const { data } = props; // Extract data from props
  const { tableHeader, tableData, tableFooter } = data; // Destructure table-specific data

  console.log("Received table data:", tableData);

  if (!tableData || tableData.length === 0) {
    return <p>No data available</p>;
  }

  // Define columns dynamically based on the keys of the first object in the tableData array
  const columns = React.useMemo(
    () =>
      Object.keys(tableData[0]).map((key) => ({
        accessorKey: key, // Key for the column
        header: key === "Year" ? "Year/Metric" : key, // Customize the header for the "Year" column
        cell: (info) => <span>{info.getValue()}</span>, // Render cell value as a React element
      })),
    [tableData]
  );

  // Define the table instance
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(), // Required for basic table functionality
  });

  return (
    <div className="space-y-4">
      {/* Table Header */}
      <h2 className="text-xl font-bold">{tableHeader}</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left text-sm">
          {/* Table Head */}
          <thead className="bg-gray-100">
            <tr>
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border border-gray-300 px-4 py-2 font-medium text-gray-700"
                    >
                      {header.isPlaceholder
                        ? null
                        : header.renderHeader
                        ? header.renderHeader()
                        : header.column.columnDef.header}
                    </th>
                  ))}
                </React.Fragment>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-100 ${
                  row.original.Year === "Total" || row.original.Year === "Grand Total"
                    ? "bg-amber-100 font-semibold"
                    : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-4 py-2 text-gray-600"
                  >
                    {cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {tableFooter && (
        <div className="mt-4">
          <BlocksRenderer content={tableFooter} />
        </div>
      )}
    </div>
  );
}