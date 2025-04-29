"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function ComboBarLineChart({ item }) {
  if (
    !item ||
    !item.barChartData ||
    !item.lineChartData ||
    !item.xkey
  ) {
    console.error("ComboBarLineChart: Missing or invalid item prop:", item);
    return <p>Composite chart data is not available.</p>;
  }

  const {
    barChartData,
    lineChartData,
    xkey,
    tooltipEnabled,
    legendEnabled,
    barColors,
    lineColors,
    chartTitle,
    chartFooter,
  } = item;

  // Combine bar and line chart data into a single dataset
  const combinedData = barChartData.map((barData, index) => ({
    ...barData,
    ...lineChartData[index],
  }));
  console.log("Combined Data:", combinedData);

  // Extract keys for bars and lines
  const barKeys = Object.keys(barChartData[0]).filter((key) => key !== xkey);
  const lineKeys = Object.keys(lineChartData[0]).filter((key) => key !== xkey);
  console.log("Bar Keys:", barKeys);
  console.log("Line Keys:", lineKeys);

  return (
    <div className="space-y-4 bg-slate-50 p-4 rounded-md">
      {/* Chart Title */}
      {chartTitle && (
        <h2 className="text-xl font-bold text-gray-700 text-center">{chartTitle}</h2>
      )}

      {/* Chart Container */}
      <ResponsiveContainer width="100%" height={400}>
  <ComposedChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey={xkey}
      tick={{ fontSize: 14, fill: "#555" }}
      tickMargin={10}
      interval={0}
      angle={0}
    />
    <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 14, fill: "#555" }} />
    <YAxis
      yAxisId="right"
      orientation="right"
      tick={{ fontSize: 14, fill: "#555" }}
      domain={['auto', 'auto']} // Automatically scale to the data
      allowDataOverflow={true} // Allow values outside the default range
    />
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
      />
    )}
    {legendEnabled && <Legend />}
    {barKeys.map((barKey, index) => (
      <Bar
        key={index}
        yAxisId="left"
        dataKey={barKey}
        fill={barColors[index] || `hsl(var(--chart-${(index % 5) + 1}))`}
        radius={[5, 5, 0, 0]}
      />
    ))}
    {lineKeys.map((lineKey, index) => {
      console.log("Rendering Line:", lineKey, lineColors[index]);
      return (
        <Line
          key={index}
          yAxisId="right"
          type="monotone"
          dataKey={lineKey}
          stroke={lineColors[index] || `hsl(var(--chart-${(index % 5) + 1}))`}
          strokeWidth={4}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      );
    })}
  </ComposedChart>
</ResponsiveContainer>
      {/* Chart Footer */}
      {chartFooter && (
        <div className="pt-4 border border-gray-300 rounded-md">
          <BlocksRenderer content={chartFooter} />
        </div>
      )}
    </div>
  );
}

// {
//     "xkey": "month",
//     "barChartData": [
//       { "month": "January", "Sales": 100, "Profit": 50 },
//       { "month": "February", "Sales": 120, "Profit": 60 },
//       { "month": "March", "Sales": 150, "Profit": 80 },
//       { "month": "April", "Sales": 170, "Profit": 90 }
//     ],
//     "lineChartData": [
//       { "month": "January", "Revenue": 200 },
//       { "month": "February", "Revenue": 220 },
//       { "month": "March", "Revenue": 250 },
//       { "month": "April", "Revenue": 270 }
//     ],
//     "barColors": ["#8884d8", "#82ca9d"],
//     "lineColors": ["#ff7300"],
//     "tooltipEnabled": true,
//     "legendEnabled": true,
//     "chartTitle": "Sales and Revenue Overview",
//     "chartFooter": [
//       {
//         "type": "text",
//         "content": "This chart shows the monthly sales, profit, and revenue."
//       }
//     ]
//   }

