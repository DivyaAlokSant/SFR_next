"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BarChart({ item }) {
  // Log the item to inspect its structure
  console.log("BarChart Component - Item Data:", item);

  // Extract data and configuration from the item
  const chartData = item.chartData || []; // Array of data points
  const chartConfig = {
    xKey: item.Xkey?.toLowerCase(),
    tooltipEnabled: item.TooltipEnabled || true, // Corrected key for tooltips
    legendEnabled: item.LegendEnables || true, // Corrected key for legend
    barColors: item.barColors || [], // Optional bar colors
  };

  const { xKey, tooltipEnabled, legendEnabled, barColors } = chartConfig;

  // Log xKey and chartData for debugging
  console.log("BarChart Component - xKey:", xKey);
  console.log("BarChart Component - chartData:", chartData);

  // Dynamically extract keys for the bars (excluding the xKey)
  const barKeys = chartData.length > 0 ? Object.keys(chartData[0]).filter((key) => key !== xKey) : [];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 14, fill: "#555" }} // Customize tick style
          tickMargin={10} // Add margin between the axis and the labels
          interval={0} // Ensure all labels are displayed
          angle={0} // Keep labels horizontal
        />
        <YAxis />
        {tooltipEnabled && <Tooltip />}
        {legendEnabled && <Legend />}
        {barKeys.map((barKey, index) => (
          <Bar
            key={index}
            dataKey={barKey}
            fill={barColors[index] || `hsl(var(--chart-${(index % 5) + 1}))`} // Use dynamic colors
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}