"use client";
import { ResponsiveSankey } from "@nivo/sankey";

export default function SankeyChart({ data, height = 400 }) {
  return (
    <div style={{ height }}>
      <ResponsiveSankey
        data={data}
        margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
        align="justify"
        colors={{ scheme: "category10" }}
        nodeOpacity={0.95}
        nodeThickness={18}
        nodeInnerPadding={6}
        nodeSpacing={32}
        nodeBorderWidth={2}
        nodeBorderRadius={8}
        nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
        linkOpacity={0.45}
        linkHoverOpacity={0.8}
        enableLinkGradient={true}
        linkContract={8}
        labelPosition="outside"
        labelOrientation="horizontal"
        labelPadding={18}
        labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        animate={true}
        motionConfig="wobbly"
        linkCurve="bump" /* <-- This makes the links wavy */
      />
    </div>
  );
}