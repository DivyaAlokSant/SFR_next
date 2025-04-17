import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Chart from '@/components/Chart';
import Table from '@/components/table'
import { fetchSubchapter, fetchSubchapterFloatingBtn } from '@/app/api';
import FloatingActionButtons, { getNavigationLinks } from "@/app/FloatingButtons";

function OurRenderer(item, index) {
  if (item.__component === "content.chart-as-image") 
    return <Chart key={index} data={item} />;
  
  if (item.__component === "content.para-content") {
    return <BlocksRenderer key={index} content={item.text} />;
  }

  if (item.__component === "content.table") {
    return <Table key={index}data={item} />;
  }

  // Fallback for unknown components
  return <p key={index}>Unknown component</p>;
}

export default async function SubchapterPage(context) {
  const { slug, subchapslug, locale } = await context.params; // Get slug, subchapter slug, and locale from dynamic route params

  let report, subchapter, subChapters;
  try {
    // Fetch the subchapter and report data for the current locale
    const subchapterData = await fetchSubchapter(slug, subchapslug, locale);
    report = subchapterData.report;
    subchapter = subchapterData.subchapter;
    console.log("subchapter", subchapter);

    // Fetch navigation links for subchapters
    const floatingBtnData = await fetchSubchapterFloatingBtn(slug, subchapslug, locale);
    subChapters = floatingBtnData.subChapters;
  } catch (error) {
    console.error("Error fetching subchapter data:", error);
    report = null;
    subchapter = null;
    subChapters = [];
  }

  const { previous, next } = getNavigationLinks(subChapters, subchapslug);

  return (
    <div className="flex-1 p-5 relative">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-80 right-1 z-50">
        <FloatingActionButtons
          back={previous ? `/${locale}/our-reports/${slug}/${previous.slug}` : null}
          forward={next ? `/${locale}/our-reports/${slug}/${next.slug}` : null}
        />
      </div>

      {/* Main Content */}
      <div className="p-10 bg-white shadow-md rounded-lg overflow-y-auto max-h-[calc(100vh-2rem)]">
        {subchapter ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{subchapter.subChapterName}</h1>
            <h3 className="text-2xl font-semibold mb-4">Report: {report?.title || "N/A"}</h3>
            <p className="text-lg text-gray-600 mb-4">{report?.description || "N/A"}</p>

            <div className="prose max-w-none text-justify">
              {subchapter.dynamicContent.map((item, index) => OurRenderer(item, index))}
            </div>
          </>
        ) : (
          <p className="text-gray-500">
            {locale === "en"
              ? "Subchapter not found or failed to load."
              : "ಉಪ ಅಧ್ಯಾಯ ಲಭ್ಯವಿಲ್ಲ ಅಥವಾ ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ."}
          </p>
        )}
      </div>
    </div>
  );
}