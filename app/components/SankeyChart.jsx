"use client";
import { ResponsiveSankey } from "@nivo/sankey";
import { useRouter } from "next/navigation";

export default function SankeyChart({ data, height = 400, locale, chapterNumber }) {
  const router = useRouter();

  // Define your node-to-link mapping here
  const nodeLinks = {
    "Tax Revenue": `/${locale}/chap-summary/${chapterNumber}/tax-revenue`,
    "Own-Tax Revenue": `/${locale}/chap-summary/${chapterNumber}/own-tax-revenue`,
    // ...add more mappings as needed
  };

  return (
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
        onClick={node => {
          // Only handle node clicks, not link clicks
          if (node?.id && nodeLinks[node.id]) {
            router.push(nodeLinks[node.id]);
          }
        }}
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
  );
}