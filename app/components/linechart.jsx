"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import React, { useState } from "react";

export default function LineChart({ item }) {
  // ...existing code...
const chartData = item.chartData || [];
const xKey = item.xkey || "month";
const xLabels = chartData.map(d => d[xKey]);
const [selectedXLabels, setSelectedXLabels] = useState(xLabels);

const tooltipEnabled = item.tooltipEnabled !== undefined ? item.tooltipEnabled : true;
const legendEnabled = item.legendEnabled !== undefined ? item.legendEnabled : true;
const lineColors = item.lineColors || [];
const lineKeys = chartData.length > 0 ? Object.keys(chartData[0]).filter((key) => key !== xKey) : [];
const [visibleLines, setVisibleLines] = useState(
  () => Object.fromEntries(lineKeys.map(key => [key, true]))
);
  // Checkbox handler
  const handleXLabelCheckbox = (label) => {
    setSelectedXLabels((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };
  const filteredChartData = chartData.filter(d => selectedXLabels.includes(d[xKey]));
  // ...existing code above...
const renderLegend = () => (
  <div className="flex gap-4 mt-4 mb-2 justify-center">
    {lineKeys.map((key, idx) => (
      <span
        key={key}
        onClick={() =>
          setVisibleLines((prev) => ({
            ...prev,
            [key]: !prev[key],
          }))
        }
        style={{
          cursor: "pointer",
          textDecoration: visibleLines[key] ? "none" : "line-through",
          color: lineColors[idx] || `hsl(var(--chart-${(idx % 5) + 1}))`,
          fontWeight: visibleLines[key] ? "bold" : "normal",
          opacity: visibleLines[key] ? 1 : 0.5,
          userSelect: "none",
        }}
      >
        <svg width="16" height="16" style={{ marginRight: 4, verticalAlign: "middle" }}>
          <rect width="16" height="4" y="6" fill={lineColors[idx] || `hsl(var(--chart-${(idx % 5) + 1}))`} />
        </svg>
        {key}
      </span>
    ))}
  </div>
);


  return (
    <div className="rounded-md my-2">
      <div className="overflow-x-auto">
        <div className="w-full bg-white rounded-lg border border-gray-300">
          {/* Chart Header */}
          {item.chartTitle && (
            <div className="w-full text-lg font-semibold text-gray-700 py-3 bg-gray-100 border-b border-gray-300 rounded-t-lg text-center">
              {item.chartTitle}
            </div>
          )}
          <div className="flex flex-row">
            {/* Chart */}
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={400} className="pt-6">
                <RechartsLineChart data={filteredChartData} margin={{ top: 20, right: 20, left: 5, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey={xKey}
                    tick={{ fontSize: 14, fill: "#555" }}
                    tickMargin={10}
                    interval={0}
                    angle={0}
                  />
                  <YAxis />
                  {tooltipEnabled && (
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        padding: "4px 6px",
                        borderRadius: "4px",
                        lineHeight: "1.2",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      }}
                      itemStyle={{
                        fontSize: "12px",
                        color: "#555",
                      }}
                      formatter={(value, name, props) => {
                        const lineIndex = lineKeys.indexOf(name);
                        const color = lineColors[lineIndex] || `hsl(var(--chart-${(lineIndex % 5) + 1}))`;
                        return (
                          <span style={{ color }}>
                            {value}
                          </span>
                        );
                      }}
                    />
                  )}
                  {lineKeys.map((lineKey, index) =>
                    visibleLines[lineKey] ? (
                      <Line
                        key={index}
                        type="monotone"
                        dataKey={lineKey}
                        stroke={lineColors[index] || `hsl(var(--chart-${(index % 5) + 1}))`}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      >
                        <LabelList
                          dataKey={lineKey}
                          position="top"
                          offset={10}
                          style={{ fontSize: 12, fontWeight: "bold", fill: lineColors[index] || "#222" }}
                          formatter={(value) => value}
                        />
                      </Line>
                    ) : null
                  )}
                </RechartsLineChart>
              </ResponsiveContainer>
              {/* Move legend here */}
              {legendEnabled && renderLegend()}
            </div>
            {/* X-axis label filter checkboxes */}
            <div className="flex flex-col items-start ml-2 mt-6 min-w-[120px] max-h-[400px] overflow-y-auto border rounded px-2 py-2 bg-gray-50">
              <div className="font-semibold mb-2 text-sm text-gray-700">Filter X Labels</div>
              {xLabels.map(label => (
                <label key={label} className="flex items-center mb-1 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedXLabels.includes(label)}
                    onChange={() => handleXLabelCheckbox(label)}
                    className="mr-2"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
          {/* Chart Footer */}
          {item.chartFooter && (
            <div className="w-full bg-gray-100 border-t border-gray-300 rounded-b-lg px-4 py-1 text-xs italic leading-tight footer-blocks">
              <BlocksRenderer content={item.chartFooter} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sample data 
// [
//     {
//       "month": "January",
//       "North": -10,
//       "South": 80
//     },
//     {
//       "month": "Februrary",
//       "North": 70,
//       "South": 120
//     },
//     {
//       "month": "March",
//       "North": 110,
//       "South": -20
//     },
//     {
//       "month": "April",
//       "North": 120,
//       "South": 70
//     }
//   ]