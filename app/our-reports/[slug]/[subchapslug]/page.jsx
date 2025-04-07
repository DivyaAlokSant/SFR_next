import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Chart from '@/components/Chart';
import { fetchSubchapter } from '@/app/api';


function OurRenderer(item, index) {
  if (item.__component === "content.chart-as-image") 
    return <Chart key={index} data={item} />;
  
  if (item.__component === "content.para-content") {
    return <BlocksRenderer key={index} content={item.text} />;
  }

  if (item.__component === "content.table") {
    return <p key={index}>This is the table dynamic component</p>;
  }

  // Fallback for unknown components
  return <p key={index}>Unknown component</p>;
}

export default async function SubchapterPage(context) {
  const { slug, subchapslug } = await context.params; // Await params here
  console.log("Slug:", slug);
  console.log("SubChapter Slug:", subchapslug);

  const { report, subchapter } = await fetchSubchapter(slug, subchapslug);
  console.log("SubChapter:", subchapter);

  return (
    <div className="flex-1 p-5">    
      <div className=" p-10 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{subchapter.subChapterName}</h1>
      <h3 className="text-2xl font-semibold mb-4">Report: {report?.title || "N/A"}</h3>
      <p className="text-lg text-gray-600 mb-4">{report?.description || "N/A"}</p>
      <div className="prose max-w-none text-justify ">
        {subchapter.dynamicContent.map((item, index) => OurRenderer(item, index))}
      </div>
    </div>
    </div>
 
  );
}