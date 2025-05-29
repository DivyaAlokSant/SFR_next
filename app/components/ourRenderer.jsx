import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import BarChart from '@/app/components/charts/barChart';
import Table from '@/app/components/charts/table';
import LineChart from '@/app/components/charts/linechart';
import ComboChart from '@/app/components/charts/comboChart';
import PieChart from '@/app/components/charts/pieChart';
import StackBarChart from '@/app/components/charts/stackBarChart';
import DataImage from '@/app/components/charts/DataImage';
import SankeyChartPro from './charts/sankeyChartpro';
import TextCard from './dashboard/textCard';
import TableauChart from './charts/tableuChart';

export default function OurRenderer({ item, index }) {
  if (item.__component === "content.chart-as-image")
    return <DataImage key={index} data={item} />;
  if (item.__component === "content.para-content") {
    return <BlocksRenderer key={index} content={item.text} />;
  }
  if (item.__component === "content.table") {
    return <Table key={index} data={item} />;
  }
  if (item.__component === "content.bar-chart") {
    return <BarChart key={index} item={item} />;
  }
  if (item.__component === "content.line-chart") {
    return <LineChart key={index} item={item} />;
  }
  if (item.__component === "content.combo-bar-line-chart") {
    return <ComboChart key={index} item={item} />;
  }
  if (item.__component === "content.pie-chart") {
    return <PieChart key={index} item={item} />;
  }
  if (item.__component === "content.stack-bar-chart") {
    return <StackBarChart key={index} item={item} />;
  }
  if (item.__component === "content.sankey-chart") {
    console.log("SankeyChartPro item:", item);
    return (
      <SankeyChartPro
        key={index}
        nodesData={item.dataNodes}
        linksData={item.datalinks}
        title={item.Title}
        chartFooter={item.chartFooter}
        nodeLinks={item.nodeLinks}
      />
    );
  }
  if (item.__component === "content.text-card") {
    return <TextCard key={index} heading={item.Heading} detail={item.detail} />;
  }
  if (item.__component === "content.tableu-chart") {
  return <TableauChart key={index} embedCode={item.EmbedCode} height={item.height} width={item.width} divId={item.sectionId} />;
}
if (item.__component === "content.hero-section") {
  return <HeroSection />;
}
  return <p key={index}>Unknown component</p>;
}