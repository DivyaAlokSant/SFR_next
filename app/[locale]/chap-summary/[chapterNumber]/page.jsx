"use client"
import CenteredTabs from "@/app/components/tabs";
import React, { useState } from "react";


export default function ChapterSummaryPage({ params }) {
  const { chapterNumber, locale } = params;
  const [tab, setTab] = React.useState(0);

  const tabs = [
    { label: "Overview" },
    { label: "Finances of the States" },
    { label: "Budgetary Mangement" },
    { label: "Audit Findings" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-2">
      <CenteredTabs
        tabs={tabs}
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
      />
      {/* Render tab content below */}
      <div className="w-full max-w-4xl mt-8">
        {tab === 0 && <div>Overview </div>}
        {tab === 1 && <div>Finances of the States</div>}
        {tab === 2 && <div>Budgetary Management</div>}
        {tab === 3 && <div>Audit Findings</div>}
      </div>
    </div>
  );
}