"use client";

import { useState } from "react";
import SearchBar from "@/app/components/reports/searchBar";
import ReportList from "@/app/components/reports/reportList";

export default function SearchAndReportList({ reports, locale }) {
  const [filteredReports, setFilteredReports] = useState(reports);

  return (
    <>
      <SearchBar
        data={reports}
        filterKeys={["title", "description", "year","Tags"]}
        placeholder={
          locale === "en"
            ? "Search Reports by name, year, tags or description..."
            : "ಹೆಸರು, ವರ್ಷ, ಅಥವಾ ವಿವರಣೆಯ ಮೂಲಕ ಹುಡುಕಿ..."
        }
        onResults={setFilteredReports}
      />
      <ReportList reports={filteredReports} locale={locale} />
    </>
  );
}