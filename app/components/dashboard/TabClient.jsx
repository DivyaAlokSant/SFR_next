"use client";
import { useState } from "react";
import CenteredTabs from "@/app/components/dashboard/tabs";
import OurRenderer from "@/app/components/ourRenderer";
import TreeChart from "../charts/treeChart";

export default function TabClient({ overviewContent, financesContent }) {
  const [tab, setTab] = useState(0);

  const tabs = [
    { label: "Overview" },
    { label: "Finances of the States" },
    { label: "Budgetary Management" },
    { label: "Audit Findings" },
  ];
  const sampleTreeData = {
    name: "Government Accounts",
    children: [
      {
        name: "Consolidated Fund",
        children: [
          {
            name: "Receipts",
            children: [
              {
                name: "Revenue Receipts",
                children: [
                  { name: "Tax Revenue" },
                  { name: "Non-Tax Revenue" },
                  { name: "Grants-in-Aid and Contributions" },
                  { name: "State's share of Union Taxes and Duties" },
                ],
              },
              {
                name: "Capital Receipts",
                children: [
                  { name: "Debt Receipts" },
                  { name: "Non-debt Receipts" },
                ],
              },
            ],
          },
          {
            name: "Expenditure",
            children: [
              {
                name: "Revenue Expenditure",
                children: [
                  { name: "General Services" },
                  { name: "Social Services" },
                  { name: "Economic Services" },
                  { name: "Grants-in-Aid & Contributions" },
                ],
              },
              {
                name: "Capital Expenditure",
                children: [
                  { name: "General Services" },
                  { name: "Social Services" },
                  { name: "Economic Services" },
                  { name: "Public Debt" },
                  { name: "Loans and Advances" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Contingency Fund",
      },
      {
        name: "Public Account",
        children: [
          { name: "Small Savings and PF etc." },
          { name: "Reserve Funds" },
          { name: "Deposits and Advances" },
          { name: "Suspense and Miscellaneous" },
          { name: "Remittances" },
          { name: "Cash balances" },
        ],
      },
    ],
  };
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
            <div className="w-full max-w-6xl mt-8 z-50 bg-white/75 rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center">Pictorial depiction of the structure of Government Accounts</h2>
              <TreeChart data={sampleTreeData} />
            </div>
          </div>
        )}
        {tab === 1 && (
          <div className="max-w-6xl gap-6">
            {financesContent.map((item, i) => (
              <div key={item.id || i} id={item.sectionId || undefined} className="mb-8">
                <OurRenderer item={item} index={i} />
              </div>
            ))}
          </div>
        )}
        {tab === 2 && <div>Budgetary Management</div>}
        {tab === 3 && <div>Audit Findings</div>}
      </div>
    </>
  );
}
