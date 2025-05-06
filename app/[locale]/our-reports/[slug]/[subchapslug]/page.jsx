import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import BarChart from '@/app/components/barChart';
import Table from '@/app/components/table'
import { fetchSubchapter, fetchSubchapterFloatingBtn } from '@/app/api';
import FloatingActionButtons, { getNavigationLinks } from "@/app/components/FloatingButtons";
import LineChart from '@/app/components/linechart';
import ComboChart from '@/app/components/comboChart';
import PieChart from '@/app/components/pieChart';
import StackBarChart from '@/app/components/stackBarChart';
import DataImage from '@/app/components/DataImage';

function OurRenderer(item, index) {
  if (item.__component === "content.chart-as-image")
    return <DataImage key={index} data={item} />;

  if (item.__component === "content.para-content") {
    return <BlocksRenderer key={index} content={item.text} />;
  }

  if (item.__component === "content.table") {
    return <Table key={index} data={item} />;
  }
  if (item.__component === "content.bar-chart") {
    //console.log("BarChart Parent - Item Data:", item);
    return <BarChart key={index} item={item} />;
  }
  if (item.__component === "content.line-chart") {
    //console.log("LineChart Parent - Item Data:", item); 
    return <LineChart key={index} item={item} />;
  }
  if (item.__component === "content.combo-bar-line-chart") {
   // console.log("ComboChart Parent - Item Data:", item);
    return <ComboChart key={index} item={item} />;
  }
  if (item.__component === "content.pie-chart") {
    // console.log("Pie Parent - Item Data:", item);
    return <PieChart key={index} item={item} />;
  }
  if (item.__component === "content.stack-bar-chart") {
    console.log("Stacked Bar chart Parent - Item Data:", item);
    return <StackBarChart key={index} item={item} />;
  }

  // Fallback for unknown components
  return <p key={index}>Unknown component</p>;
}

export default async function SubchapterPage(context) {
  const { slug, subchapslug, locale } = await context.params; // Get slug, subchapter slug, and locale from dynamic route params

  let report, subchapter, subChapters;
  try {
    // Fetch the subchapter and report data for the current locale
    const subchapterData = await fetchSubchapter(slug, subchapslug, locale, { next: { revalidate: 600 } });
    report = subchapterData.report;
    subchapter = subchapterData.subchapter;
    //console.log("subchapter", subchapter);

    // Fetch navigation links for subchapters
    const floatingBtnData = await fetchSubchapterFloatingBtn(slug, subchapslug, locale,{ next: { revalidate: 600 } }) ;
    subChapters = floatingBtnData.subChapters;
  } catch (error) {
    console.error("Error fetching subchapter data:", error);
    report = null;
    subchapter = null;
    subChapters = [];
  }

  const { previous, next } = getNavigationLinks(subChapters, subchapslug);

  return (
    <div className=" p-0 relative">

      <div className="fixed bottom-40 right-1 z-50">
        <FloatingActionButtons
          back={previous ? `/${locale}/our-reports/${slug}/${previous.slug}` : null}
          forward={next ? `/${locale}/our-reports/${slug}/${next.slug}` : null}
          reportSlug={slug}
          locale={locale}
        />
      </div>


      <div className="p-6 bg-white shadow-md rounded-lg overflow-y-auto max-h-[calc(100vh-2rem)]">
        {subchapter ? (
          <>
            <h1 className="text-3xl font-bold mb-4 pl-5">{subchapter.subChapterName}</h1>
            {/* <h3 className="text-2xl font-semibold mb-4 pl-5">Report: {report?.title || "N/A"}</h3>
            <p className="text-lg text-gray-600 mb-4 pl-5">{report?.description || "N/A"}</p> */}

            <div className="prose max-w-none text-justify pl-5">
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