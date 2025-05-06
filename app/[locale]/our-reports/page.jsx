import { getAllReports } from "@/app/api";
import SearchAndReportList from "@/app/components/searchandReportList";

export default async function Page({ params }) {
  const { locale } = await params;
  const reports = await getAllReports(locale, { next: { revalidate: 600 } });
  return (
    <div>
      <h1>
        {locale === "en"
          ? "This is our Reports page. Welcome"
          : "ನಮ್ಮ ವರದಿ ಪುಟಕ್ಕೆ ಸ್ವಾಗತ"}
      </h1>

      {/* Search and Report List */}
      <SearchAndReportList reports={reports} locale={locale} />
    </div>
  );
}