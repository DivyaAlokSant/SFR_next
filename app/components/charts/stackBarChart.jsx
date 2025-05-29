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
    Label,
} from "recharts";

export default function StackBarChart({ item }) {
    if (!item || !item.chartData) {
        return <p>Stacked bar chart data is not available.</p>;
    }

    const chartData = item.chartData || [];
    const barColors = item.barColors || [];
    const tooltipEnabled = item.tooltipEnabled !== undefined ? item.tooltipEnabled : true;
    const legendEnabled = item.legendEnabled !== undefined ? item.legendEnabled : true;
    const chartTitle = item.chartTitle;
    const chartFooter = item.chartFooter;

    // Dynamically determine xKey (first key) and barKeys (rest)
    const firstData = chartData[0] || {};
    const keys = Object.keys(firstData);
    const xKey = keys[0];
    const barKeys = keys.slice(1);

    // Calculate totals for each stack
    const totals = chartData.map(row =>
        barKeys.reduce((sum, key) => sum + (Number(row[key]) || 0), 0)
    );

    // Custom label renderer for stack totals
    const renderStackTotal = (props) => {
        const { x, width, index } = props;
        const total = totals[index];
        const y = props.y - 10;
        return (
            <text
                x={x + width / 2}
                y={y}
                fill="#222"
                fontSize={15}
                fontWeight={600}
                textAnchor="middle"
                dominantBaseline="central"
            >
                {total}
            </text>
        );
    };

    return (
        <div className="rounded-md my-2">
            <div className="overflow-x-auto">
                <div className="w-full bg-white rounded-lg border border-gray-300">
                    {/* Chart Header */}
                    {chartTitle && (
                        <div className="w-full text-lg font-semibold text-gray-700 py-3 bg-gray-100 border-b border-gray-300 rounded-t-lg text-center">
                            {chartTitle}
                        </div>
                    )}
                    <ResponsiveContainer width="100%" height={400}>
                        <RechartsBarChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
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
                                    formatter={(value, name) => {
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
                                    key={barKey}
                                    dataKey={barKey}
                                    stackId="a"
                                    fill={barColors[index] || `hsl(var(--chart-${(index % 5) + 1}))`}
                                    radius={[5, 5, 0, 0]}
                                    isAnimationActive={true}
                                >
                                    <LabelList
                                        dataKey={barKey}
                                        position="insideTop"
                                        offset={8}
                                        style={{ fontSize: 12, fontWeight: 600, fill: "#fff" }}
                                        formatter={(value) => value}
                                    />
                                    {/* Only add the total label to the last bar in the stack */}
                                    {index === barKeys.length - 1 && (
                                        <LabelList dataKey={xKey} content={renderStackTotal} />
                                    )}
                                </Bar>
                            ))}
                        </RechartsBarChart>
                    </ResponsiveContainer>
                    {/* Chart Footer */}
                    {chartFooter && (
                        <div className="w-full bg-gray-100 border-t border-gray-300 rounded-b-lg px-4 py-1 text-xs italic leading-tight footer-blocks">
                            <BlocksRenderer content={chartFooter} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


// Sample data structure
// {
//     chartTitle: "Stacked Bar Chart Example",
//     chartData: [
//       { "month": "January", "North": 40, "South": 24, "East": 30, "West": 20 },
//       { "month": "February", "North": 50, "South": 34, "East": 60, "West": 30 },
//       { "month": "March", "North": 25, "South": 24, "East": 40, "West": 10 },
//       { "month": "April", "North": 35, "South": 22, "East": 32, "West": 15 }
//     ],
//     barColors: ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"],
//     tooltipEnabled: true,
//     legendEnabled: true,
//     chartFooter: [
//       {
//         type: "text",
//         content: "This chart shows the stacked values for each region in January."
//       }
//     ]
//   }