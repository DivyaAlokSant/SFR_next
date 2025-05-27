"use client"
import CenteredTabs from "@/app/components/tabs";
import React, { useState, useEffect } from "react";
import { fetchOverviewTab } from "@/app/api";
import OurRenderer from "@/app/components/ourRenderer";

export default function ChapterSummaryPage({ params }) {
  const { chapterNumber, locale } = params;
  const [tab, setTab] = useState(0);
  const [overviewContent, setOverviewContent] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { label: "Overview" },
    { label: "Finances of the States" },
    { label: "Budgetary Mangement" },
    { label: "Audit Findings" },
  ];

  useEffect(() => {
    if (tab === 0) {
      setLoading(true);
      fetchOverviewTab(locale)
        .then((data) => {
          // Adjust this if your API returns a different structure
          const dynamicContent = data?.[0]?.dynamicContent || [];
          setOverviewContent(dynamicContent);
        })
        .finally(() => setLoading(false));
    }
  }, [tab, locale]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-2">
      <CenteredTabs
        tabs={tabs}
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
      />
      <div className="w-full max-w-4xl mt-8">
        {tab === 0 && (
          <div>
            {loading && <div>Loading...</div>}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {overviewContent.map((item, i) => (
                  <OurRenderer key={i} item={item} index={i} />
                ))}
              </div>
            )}
          </div>
        )}
        {tab === 1 && <div>Finances of the States</div>}
        {tab === 2 && <div>Budgetary Management</div>}
        {tab === 3 && <div>Audit Findings</div>}
      </div>
    </div>
  );
}