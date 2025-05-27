import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import BarChart from '@/app/components/barChart';
import Table from '@/app/components/table';
import LineChart from '@/app/components/linechart';
import ComboChart from '@/app/components/comboChart';
import PieChart from '@/app/components/pieChart';
import StackBarChart from '@/app/components/stackBarChart';
import DataImage from '@/app/components/DataImage';
import SankeyChartPro from './sankeyChartpro';
import TextCard from './textCard';
import TableauChart from './tableuChart';

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
      />
    );
  }
  if (item.__component === "content.text-card") {
    return <TextCard key={index} heading={item.Heading} detail={item.detail} />;
  }
  if (item.__component === "content.tableu-chart") {
  return <TableauChart key={index} embedCode={item.EmbedCode} height={item.height || 400} width={item.width || "100%"}/>;
}
  return <p key={index}>Unknown component</p>;
}