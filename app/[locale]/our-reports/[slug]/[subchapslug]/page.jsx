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
  return <p key={index}>Unknown component</p>;
}

export default async function SubchapterPage(context) {
  const { slug, subchapslug, locale } = await context.params; 
  let report, subchapter, subChapters;
  try {
    const subchapterData = await fetchSubchapter(slug, subchapslug, locale, { next: { revalidate: 600 } });
    report = subchapterData.report;
    subchapter = subchapterData.subchapter;

    const floatingBtnData = await fetchSubchapterFloatingBtn(slug, subchapslug, locale, { next: { revalidate: 600 } });
    subChapters = floatingBtnData.subChapters;
  } catch (error) {
    report = null;
    subchapter = null;
    subChapters = [];
  }

  const { previous, next } = getNavigationLinks(subChapters, subchapslug);

  return (
    <>
      {/* Floating buttons fixed to bottom right of viewport */}
      <div className="fixed bottom-6 right-6 z-50">
        <FloatingActionButtons
          back={previous ? `/${locale}/our-reports/${slug}/${previous.slug}` : null}
          forward={next ? `/${locale}/our-reports/${slug}/${next.slug}` : null}
          reportSlug={slug}
          locale={locale}
        />
      </div>
      <div className="relative max-w-4xl mx-auto bg-white/90 rounded-xl shadow p-6 md:p-10">
        {subchapter ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-gray-900">{subchapter.subChapterName}</h1>
            <div className="prose max-w-none text-justify text-gray-800 mb-8">
              {subchapter.dynamicContent.map((item, index) => OurRenderer(item, index))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-lg text-center py-12">
            {locale === "en"
              ? "Subchapter not found or failed to load."
              : "ಉಪ ಅಧ್ಯಾಯ ಲಭ್ಯವಿಲ್ಲ ಅಥವಾ ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ."}
          </p>
        )}
      </div>
    </>
  );
}