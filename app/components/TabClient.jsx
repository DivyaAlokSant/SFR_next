"use client";
import { useState } from "react";
import CenteredTabs from "@/app/components/tabs";
import OurRenderer from "@/app/components/ourRenderer";

export default function TabClient({ overviewContent, financesContent }) {
  const [tab, setTab] = useState(0);

  const tabs = [
    { label: "Overview" },
    { label: "Finances of the States" },
    { label: "Budgetary Management" },
    { label: "Audit Findings" },
  ];

  return (
    <>
      <CenteredTabs
        tabs={tabs}
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
      />
      <div className="w-full max-w-6xl mt-8">
        {tab === 0 && (
          <div>
            <div className="flex items-center justify-center">
              <img
                src="/mapKar.png"
                alt="Karnataka Map"
                width={200}
                height={200}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {overviewContent.map((item, i) => (
                <OurRenderer key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        )}
        {tab === 1 && (
          <div className="max-w-6xl gap-6">
            {financesContent.map((item, i) => (
              <OurRenderer key={i} item={item} index={i} />
            ))}
          </div>
        )}
        {tab === 2 && <div>Budgetary Management</div>}
        {tab === 3 && <div>Audit Findings</div>}
      </div>
    </>
  );
}
