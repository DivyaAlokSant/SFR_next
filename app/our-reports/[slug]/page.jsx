import qs from 'qs';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

async function fetchReport(slug) {
  const ourQuery = qs.stringify({
    filters: {
      slug: {
        $eq: slug, // Filter by report slug
      },
    },
    populate: {
      image: true,
      chapters: {
        sort: ['ChapterNumber:asc'], // Sort chapters by ChapterNumber
        populate: {
          sub_chapters: {
            sort: ['subChapterOrder:asc'], // Sort subchapters by subChapterOrder
          },
        },
      },
    },
  }, { encodeValuesOnly: true }); // Ensure proper encoding of query parameters

  const response = await fetch(`http://localhost:1337/api/reports?${ourQuery}`);
  console.log("API Response Status:", response.status);

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("API Error Details:", errorDetails);
    throw new Error(`Failed to fetch report: ${response.statusText}`);
  }

  const report = await response.json();
  return report.data[0]; // Return the first report
}

export default async function Page(context) {
  const { slug } = await context.params; // Await params here to fix the error

  const report = await fetchReport(slug);
  console.log("Fetched Report:", report);

  return (
    <SidebarProvider>
      <div className="flex relative">
        {/* Sidebar */}
        <div className="relative w-64 transition-width duration-300">
          <AppSidebar chapters={report.chapters} reportSlug={slug} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-5">
          <SidebarTrigger />
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4">{report.title}</h1>
            <h2 className="text-xl text-gray-700 mb-4">{report.description}</h2>
            {report.image && (
              <img
                src={`http://localhost:1337${report.image.url}`}
                alt={report.title}
                className="w-full h-auto mb-6 rounded-lg shadow-md"
              />
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}