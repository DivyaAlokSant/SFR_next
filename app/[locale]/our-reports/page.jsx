import { getAllReports } from "@/app/api";
import SearchAndReportList from "@/app/components/reports/searchandReportList";

export default async function Page({ params }) {
  const { locale } = await params;
  const reports = await getAllReports(locale, { next: { revalidate: 600 } });
  return (
    <div className="max-w-4xl mx-auto bg-white/80 rounded-xl shadow p-8 my-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {locale === "en"
          ? "This is our Reports page. Welcome"
          : "ನಮ್ಮ ವರದಿ ಪುಟಕ್ಕೆ ಸ್ವಾಗತ"}
      </h1>
      {/* Search and Report List */}
      <SearchAndReportList reports={reports} locale={locale} />
    </div>
  );
}