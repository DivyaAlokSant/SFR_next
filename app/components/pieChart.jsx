"use client";

import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { data } from "autoprefixer";

export default function PieChart({ item }) {
  // Accepts either item.pieChartData or item.chartData for flexibility
  const pieChartData = item.pieChartData || item.chartData;
  const pieColors = item.pieColors || [];
  const tooltipEnabled = item.tooltipEnabled !== undefined ? item.tooltipEnabled : true;
  const legendEnabled = item.legendEnabled !== undefined ? item.legendEnabled : true;
  const chartTitle = item.chartTitle;
  const chartFooter = item.chartFooter;

  if (!pieChartData || !Array.isArray(pieChartData) || pieChartData.length === 0) {
    return <p>Pie chart data is not available.</p>;
  }

  // Dynamically determine xkey and ykey from the first data object
  const firstData = pieChartData[0] || {};
  const keys = Object.keys(firstData);
  // Assume the first key is the label (xkey), the second is the value (ykey)
  const [xkey, ykey] = keys;

  return (
    <div className="space-y-1 bg-cyan-50 p-1 rounded-md">
      {chartTitle && (
        <h2 className="text-xl font-bold text-gray-700 text-center">{chartTitle}</h2>
      )}
      <ResponsiveContainer width="100%" height={400}>
        <RechartsPieChart>
          <Pie
            data={pieChartData}
            dataKey={ykey}
            nameKey={xkey}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            label={({ name, value, percent }) =>
                `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
              }
          >
            {pieChartData.map((entry, idx) => (
              <Cell
                key={`cell-${idx}`}
                fill={pieColors[idx] || `hsl(var(--chart-${(idx % 5) + 1}))`}
              />
            ))}
          </Pie>
          {tooltipEnabled && (
  <Tooltip
    contentStyle={{
      fontSize: "12px",
      padding: "4px 6px",
      borderRadius: "4px",
      lineHeight: "1.2",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      fontWeight: "bold"
    }}
    itemStyle={{
      fontSize: "12px",
      color: "#555",
    }}
    formatter={(value, name, props) => {
      // Find the color for this slice
      const idx = pieChartData.findIndex(entry => entry[xkey] === name);
      const color = pieColors[idx] || `hsl(var(--chart-${(idx % 5) + 1}))`;
      return (
        <span style={{ color }}>
          {value}
        </span>
      );
    }}
  />
)}
          {legendEnabled && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
      {chartFooter && (
        <div className="pt-0 ">
          <BlocksRenderer content={chartFooter} />
        </div>
      )}
    </div>
  );
}


// Sample data
// [
//     {
//       "category": "A",
//       "value": 400
//     },
//     {
//       "category": "B",
//       "value": 300
//     },
//     {
//       "category": "C",
//       "value": 500
//     },
//     {
//       "category": "D",
//       "value": 250
//     }
//   ]