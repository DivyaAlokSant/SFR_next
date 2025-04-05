import qs from 'qs';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Chart from '@/components/Chart';

async function fetchSubchapter(slug, subchapslug) {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: subchapslug, // Filter by subchapter slug
      },
      chapter: {
        report: {
          slug: {
            $eq: slug, // Ensure the subchapter belongs to the correct report
          },
        },
      },
    },
    populate: {
      dynamicContent: {
        on: {
          "content.chart-as-image": {
            populate: {
              chart: "*", // Populate the chart (image) field
            },
          },
          "content.table": {
            populate: "*", // Populate all fields for the table component
          },
          "content.para-content": {
            populate: "*", // Populate all fields for the para component
          },
        },
      },
      chapter: {
        populate: {
          report: {
            populate: {
              chapters: {
                sort: ["ChapterNumber:asc"], // Sort chapters by ChapterNumber
                populate: {
                  sub_chapters: {
                    sort: ["subChapterOrder:asc"], // Sort subchapters by subChapterOrder
                  },
                },
              },
            },
          },
        },
      },
    },
  }, { encodeValuesOnly: true }); // Ensure proper encoding of query parameters

  const response = await fetch(`http://localhost:1337/api/sub-chapters?${query}`);
  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Failed to fetch subchapter: ${response.statusText}`);
  }

  const data = await response.json();
  const subchapter = data.data[0];
  const chapter = subchapter?.chapter;
  const report = chapter?.report;

  return { report, subchapter };
}

function OurRenderer(item, index) {
  if (item.__component === "content.chart-as-image")
    return <Chart key={index} data={item} />;

  if (item.__component === "content.para-content") {
    return <BlocksRenderer key={index} content={item.text} />;
  }

  if (item.__component === "content.table") {
    return <p key={index}>This is the table dynamic component</p>;
  }

  return <p key={index}>Unknown component</p>;
}

export default async function SubchapterPage(context) {
  const { slug, subchapslug } = await context.params;
  const { report, subchapter } = await fetchSubchapter(slug, subchapslug);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="relative w-64 bg-gray-100 border-r border-gray-300 hidden md:block">
          <AppSidebar chapters={report?.chapters || []} reportSlug={slug} />
        </div>
    </SidebarProvider>
        {/* Main Content */ }
  <main className="flex-1 p-5">
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{subchapter.subChapterName}</h1>
      <h3 className="text-2xl font-semibold mb-4">Report: {report?.title || "N/A"}</h3>
      <p className="text-lg text-gray-600 mb-4">{report?.description || "N/A"}</p>
      <div className="prose max-w-none">
        {subchapter.dynamicContent.map((item, index) => OurRenderer(item, index))}
      </div>
    </div>
  </main>
      </div >
    
  );
}