"use client";
import { ResponsiveRadar } from "@nivo/radar";

export default function RadarChart({
  data,
  height = 400,
  margin = { top: 70, right: 80, bottom: 40, left: 80 },
  gridLabelOffset = 36,
  dotSize = 10,
  dotColor = { theme: "background" },
  dotBorderWidth = 2,
  blendMode = "multiply",
  legends = [
    {
      anchor: "top-left",
      direction: "column",
      translateX: -50,
      translateY: -40,
      itemWidth: 80,
      itemHeight: 20,
      symbolShape: "circle",
    },
  ],
}) {
  // Auto-detect indexBy and keys from data
  const first = data && data.length > 0 ? data[0] : {};
  const allKeys = Object.keys(first);
  const indexBy = allKeys[0] || "index";
  const keys = allKeys.slice(1);

  return (
    <div style={{ height }}>
      <ResponsiveRadar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={margin}
        gridLabelOffset={gridLabelOffset}
        dotSize={dotSize}
        dotColor={dotColor}
        dotBorderWidth={dotBorderWidth}
        blendMode={blendMode}
        legends={legends}
      />
    </div>
  );
}