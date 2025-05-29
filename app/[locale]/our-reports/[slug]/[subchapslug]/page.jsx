import { fetchSubchapter, fetchSubchapterFloatingBtn } from '@/app/api';
import FloatingActionButtons, { getNavigationLinks } from "@/app/components/reports/FloatingButtons";
import OurRenderer from '@/app/components/ourRenderer';



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
              {subchapter.dynamicContent.map((item, index) => (
                <OurRenderer key={index} item={item} index={index} />
              ))}
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