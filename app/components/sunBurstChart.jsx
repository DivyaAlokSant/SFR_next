"use client";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// Utility to lighten a hex color
function lighten(hex, percent) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  r = Math.round(r + (255 - r) * percent);
  g = Math.round(g + (255 - g) * percent);
  b = Math.round(b + (255 - b) * percent);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// Assign base colors to root nodes
const baseColors = [
  "#636efa", // blue
  "#EF553B", // red
  "#00cc96", // green
  "#ab63fa", // purple
  "#FFA15A", // orange
  "#19d3f3", // cyan
  "#FF6692", // pink
  "#B6E880", // light green
  "#FF97FF", // magenta
];

function generateSunburstColors(labels, parents) {
  const colorMap = {};
  let colorIdx = 0;
  return labels.map((label, idx) => {
    const parent = parents[idx];
    if (!parent) {
      // Root node: assign a base color
      colorMap[label] = baseColors[colorIdx % baseColors.length];
      colorIdx++;
      return colorMap[label];
    }
    // Child: lighten parent's color
    const parentColor = colorMap[parent] || "#888";
    // Lighten by 30% per level (can be adjusted)
    const shade = 0.3 + 0.15 * (label.split(" ").length - 1);
    const color = lighten(parentColor, shade);
    colorMap[label] = color;
    return color;
  });
}

export default function SunBurstChart({ data, width = 500, height = 500, title = "Sunburst Chart" }) {
  // Use provided data or fallback to example
  const plotData = React.useMemo(() => {
    const d = data || [
      {
        type: "sunburst",
        labels: [
          "Eve", "Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"
        ],
        parents: [
          "", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve"
        ],
        values: [10, 14, 12, 10, 2, 6, 6, 4, 4],
        branchvalues: "total"
      }
    ];
    // Add dynamic colors
    return d.map(trace => ({
      ...trace,
      marker: {
        ...(trace.marker || {}),
        colors: generateSunburstColors(trace.labels, trace.parents),
      },
    }));
  }, [data]);

  const layout = {
    margin: { l: 0, r: 0, b: 0, t: 40 },
    width,
    height,
    title,
  };

  return (
    <Plot
      data={plotData}
      layout={layout}
      config={{ responsive: true }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}