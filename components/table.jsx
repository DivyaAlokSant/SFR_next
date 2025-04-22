'use client';
import React from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function Table(props) {
  const { data } = props;
  const { tableHeader, tableData, tableFooter } = data;

  console.log("Table Data:", tableData);

  if (!tableData || tableData.length === 0) {
    return <p>No data available</p>;
  }

  const columns = React.useMemo(() => {
    const firstRow = tableData[0];
    if (!firstRow || typeof firstRow !== "object") {
      console.error("Invalid table data structure:", tableData);
      return [];
    }

    return Object.keys(firstRow).map((key) => ({
      id: key,
      accessorKey: key,
      header: key,
      cell: (info) => <span>{info.getValue() || "-"}</span>,
    }));
  }, [tableData]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{tableHeader}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left text-sm">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-4 py-2 font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
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
                    {cell.getValue() || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tableFooter && (
        <div className="mt-4">
          <BlocksRenderer content={tableFooter} />
        </div>
      )}
    </div>
  );
}