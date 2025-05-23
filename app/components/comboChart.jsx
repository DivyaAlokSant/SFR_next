"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Legend, Tooltip } from "chart.js";
import { Chart } from "react-chartjs-2";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Legend, Tooltip, ChartDataLabels);

export default function ComboChart({ item }) {
  if (!item || !item.xkey) {
    return <p>Combo chart data is not available.</p>;
  }

  const {
    barChartData,
    lineChartData,
    xkey,
    barColors = [],
    lineColors = [],
    tooltipEnabled = true,
    legendEnabled = true,
    chartTitle,
    chartFooter,
  } = item;

  const labels = (barChartData || lineChartData || []).map((d) => d[xkey]);

  const barKeys = barChartData && barChartData.length > 0
    ? Object.keys(barChartData[0]).filter((key) => key !== xkey)
    : [];
  const barDatasets = barKeys.map((barKey, idx) => ({
    type: "bar",
    label: barKey,
    data: barChartData.map((d) => d[barKey]),
    backgroundColor: barColors[idx] || `hsl(var(--chart-${(idx % 5) + 1}))`,
    yAxisID: "y",
    borderRadius: 4,
    order: 2,
    datalabels: {
      anchor: "end",
      align: "start",
      color: "#222",
      font: { weight: "bold" },
      display: true,
      formatter: (value) => value,
    },
  }));

  const lineKeys = lineChartData && lineChartData.length > 0
    ? Object.keys(lineChartData[0]).filter((key) => key !== xkey)
    : [];
  const lineDatasets = lineKeys.map((lineKey, idx) => ({
    type: "line",
    label: lineKey,
    data: lineChartData.map((d) => d[lineKey]),
    borderColor: lineColors[idx] || "#ff7300",
    backgroundColor: lineColors[idx] || "#ff7300",
    yAxisID: "y1",
    tension: 0.4,
    fill: false,
    pointRadius: 4,
    pointHoverRadius: 6,
    order: 1,
    datalabels: {
      anchor: "end",
      align: "top",
      color: lineColors[idx] || "#ff7300",
      font: { weight: "bold" },
      display: true,
      formatter: (value) => value,
    },
  }));

  const data = {
    labels,
    datasets: [...barDatasets, ...lineDatasets],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: legendEnabled,
        position: "bottom",
      },
      tooltip: { enabled: tooltipEnabled },
      title: chartTitle
        ? {
          display: true,
          text: chartTitle,
          font: { size: 20 },
          color: "#374151",
        }
        : undefined,
      datalabels: {
        display: true,
        color: "#222",
        font: { weight: "bold" },
        formatter: (value) => value,
      },
    },
    scales: {
      y: {
        type: "linear",
        display: barDatasets.length > 0,
        position: "left",
        beginAtZero: true,
        grid: { drawOnChartArea: true },
        ticks: { color: "#555", font: { size: 14 } },
      },
      y1: {
        type: "linear",
        display: lineDatasets.length > 0,
        position: "right",
        beginAtZero: true,
        grid: { drawOnChartArea: false },
        ticks: { color: "#555", font: { size: 14 } },
      },
      x: {
        ticks: { color: "#555", font: { size: 14 } },
      },
    },
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
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <div className="absolute w-full inset-0 transition-all duration-300 px-6 pt-6" style={{ height: 400 }}>
              <Chart
                type="bar"
                data={data}
                options={{ ...options, maintainAspectRatio: false }}
                plugins={[ChartDataLabels]}
              />
            </div>
          </div>
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