'use client'
import React, { useState } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function Table(props) {
  const { data } = props;
  const { tableHeader, tableData, tableFooter } = data;

  if (!tableData || tableData.length === 0) {
    return <p>No data available</p>;
  }

  const [sorting, setSorting] = useState([]);

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
      enableSorting: true,
    }));
  }, [tableData]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <div className="space-y-1 ">
      <div className="overflow-x-auto ">
        <table className="w-full border-collapse border border-gray-300 text-left text-sm rounded-b-lg">
          {tableHeader && (
            <caption className="caption-top text-lg font-semibold text-gray-700 py-3 bg-gray-100 border border-gray-300 border-b-0 rounded-t-lg w-full">
              {tableHeader}
            </caption>
          )}
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-4 py-2 font-medium text-gray-700 cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : header.column.columnDef.header}
                    {header.column.getIsSorted() === "asc" && " ▲"}
                    {header.column.getIsSorted() === "desc" && " ▼"}
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
          {tableFooter && (
            <tfoot>
              <tr>
                <td colSpan={columns.length} className="w-full bg-gray-100 border-t border-gray-300 rounded-b-lg px-4 py-1 text-xs italic leading-tight footer-blocks">
                  <BlocksRenderer content={tableFooter} />
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}