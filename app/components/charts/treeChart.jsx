'use client'
import { ResponsiveTree } from "@nivo/tree";

export default function TreeChart({ data }) {
  return (
    <div style={{ width: "100%", height: 450 }}>
      <ResponsiveTree
        data={data}
        mode="dendogram"
        identity="name"
        layout="left-to-right"
        orientLabels={false}
        labelOrientation="horizontal"
        labelPosition="inward"
        activeNodeSize={32}
        inactiveNodeSize={18}
        nodeColor={{ scheme: "nivo" }}
        fixNodeColorAtDepth={4}
        nodeBorderWidth={3}
        nodeBorderColor={{ from: "color", modifiers: [["darker", 0.5]] }}
        nodeOpacity={1}
        nodeBorderRadius={12}
        linkThickness={3}
        activeLinkThickness={8}
        inactiveLinkThickness={2}
        linkColor={{ from: "target.color", modifiers: [["opacity", 0.5]] }}
        margin={{ top: 10, right: 240, bottom: 20, left: 160 }}
        meshDetectionRadius={80}
        enableLabel={true}
        label={node => node.data.name}
        labelTextColor={{ from: "color", modifiers: [["darker", 2.5]] }}
        theme={{
          labels: {
            text: {
              fontSize: 12, // ← increase this value as needed
              fontWeight: 600,
            },
          },
        }}
        linkTooltip={({ link }) => (
          <div
            style={{
              background: "#fff",
              color: "#7c3aed",
              fontSize: "1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 24px rgba(124,58,237,0.15)",
              border: "2px solid #ddd6fe",
              padding: "0.75rem 1rem",
              minWidth: 120,
              fontWeight: 600,
            }}
          >
            <div>
              <span className="font-bold">From:</span> {link.source.data.name}
            </div>
            <div>
              <span className="font-bold">To:</span> {link.target.data.name}
            </div>
          </div>
        )}
      />
    </div>
  );
}
