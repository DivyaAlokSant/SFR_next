"use client";
import { ResponsiveSankey } from "@nivo/sankey";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function SankeyChartPro({
  nodesData = [],
  linksData = [],
  height = 400,
  title,
  footer,
  chartFooter, // Accepts rich text blocks for footer
}) {
  // Transform nodesData and linksData to Nivo format
  const data = {
    nodes: nodesData.map((n) =>
      typeof n === "string" ? { id: n } : n
    ),
    links: linksData,
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden my-2">
      {/* Header */}
      {title && (
        <div className="w-full text-lg font-semibold text-gray-700 py-3 rounded-t-lg text-center">
          {title}
        </div>
      )}
      {/* Main Chart */}
      <div style={{ height }}>
        <ResponsiveSankey
          data={data}
          margin={{ top: 40, right: 20, bottom: 40, left: 40 }}
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
          labelPosition="inside"
          labelOrientation="horizontal"
          labelPadding={18}
          labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          animate={true}
          motionConfig="wobbly"
          linkCurve="bump"
          theme={{
            labels: {
              text: {
                fontSize: 12,
                fontWeight: 600,
              },
            },
          }}
        />
      </div>
      {/* Footer */}
      {(footer || chartFooter) && (
        <div className="w-full bg-gray-50 border-t border-gray-300 rounded-b-lg px-4 py-1 text-xs italic leading-tight footer-blocks">
          {chartFooter ? <BlocksRenderer content={chartFooter} /> : footer}
        </div>
      )}
    </div>
  );
}