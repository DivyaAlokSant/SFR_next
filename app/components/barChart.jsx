"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function BarChart({ item }) {
  const chartData = item.chartData || [];

  // Try to find a suitable xKey
  const firstData = chartData[0] || {};
  const keys = Object.keys(firstData);
  // Prefer 'year', 'month', or 'date' as xKey, fallback to first key
  const xKey = keys.find(k => ["year", "month", "date"].includes(k.toLowerCase())) || keys[0];

  const tooltipEnabled = item.TooltipEnabled !== undefined ? item.TooltipEnabled : true;
  const legendEnabled = item.LegendEnables !== undefined ? item.LegendEnables : true;
  const barColors = item.barColors || [];

  // All keys except the xKey are bar keys
  const barKeys = chartData.length > 0 ? Object.keys(chartData[0]).filter((key) => key !== xKey) : [];

  return (
    <div className="rounded-md">
      <div className="overflow-x-auto">
        <div className="w-full bg-white rounded-lg border border-gray-300">
          {/* Chart Header */}
          {item.Title && (
            <div className="w-full text-lg font-semibold text-gray-700 py-3 bg-gray-100 border-b border-gray-300 rounded-t-lg text-center">
              {item.Title}
            </div>
          )}
          <ResponsiveContainer width="100%" height={400} className="pt-6">
            <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                    padding: "4px 4px 4px 4px",
                    borderRadius: "4px",
                    lineHeight: "1.0",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                  itemStyle={{
                    fontSize: "12px",
                    color: "#555",
                  }}
                  formatter={(value, name, props) => {
                    const barIndex = barKeys.indexOf(name);
                    const color = barColors[barIndex] || `hsl(var(--chart-${(barIndex % 5) + 1}))`;
                    return (
                      <span style={{ color }}>
                        {value}
                      </span>
                    );
                  }}
                />
              )}
              {legendEnabled && <Legend />}
              {barKeys.map((barKey, index) => (
                <Bar
                  key={index}
                  dataKey={barKey}
                  fill={barColors[index] || `hsl(var(--chart-${(index % 5) + 1}))`}
                  radius={[5, 5, 0, 0]}
                >
                  <LabelList
                    dataKey={barKey}
                    position="top"
                    offset={8}
                    style={{ fontSize: 12, fontWeight: 600, fill: barColors[index] || "#222" }}
                    formatter={(value) => value}
                  />
                </Bar>
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
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


// sample data
// [
//   {
//     "month": "January",
//     "2020-21": -120,
//     "South": 100,
//     "west": 130
//   },
//   {
//     "month": "February",
//     "2020-21": 150,
//     "South": 140,
//     "west": 120
//   },
//   {
//     "month": "March",
//     "2020-21": 180,
//     "South": 160,
//     "west": 150
//   },
//   {
//     "month": "April",
//     "2020-21": 200,
//     "South": 190,
//     "west": 120
//   }
// ]