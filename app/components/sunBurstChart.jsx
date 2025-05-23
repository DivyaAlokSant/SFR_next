"use client";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

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
        //branchvalues: "total"
      }
    ];
    // No custom marker/colors
    return d;
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