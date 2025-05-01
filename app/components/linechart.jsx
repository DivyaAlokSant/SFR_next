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

export default function LineChart({ item }) {
  if (!item || !item.chartData || !item.xkey) {
    console.error("LineChart: Missing or invalid item prop:", item);
    return <p>Line chart data is not available.</p>;
  }

  const chartData = item.chartData || [];
  const chartConfig = {
    xKey: item.xkey,
    tooltipEnabled: item.TooltipEnabled || true,
    legendEnabled: item.LegendEnabled || true,
    lineColors: item.lineColors || [],
  };

  const { xKey, tooltipEnabled, legendEnabled, lineColors } = chartConfig;
  const lineKeys = chartData.length > 0 ? Object.keys(chartData[0]).filter((key) => key !== xKey) : [];

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
          <ResponsiveContainer width="100%" height={400} className="pt-6">
            <RechartsLineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
              {legendEnabled && <Legend />}
              {lineKeys.map((lineKey, index) => (
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
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
          {/* Chart Footer */}
          {item.chartFooter && (
             <div className="w-full bg-gray-100 border-t border-gray-300 rounded-b-lg px-4 py-1 text-xs italic leading-tight footer-blocks">  <BlocksRenderer content={item.chartFooter} />
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