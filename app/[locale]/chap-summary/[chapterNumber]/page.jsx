import SankeyChart from "@/app/components/SankeyChart";
import SunBurstChart from "@/app/components/sunBurstChart";

const sunburstData = [
    {
      type: "sunburst",
      labels: [
        "Total Receipts", "Revenue Receipts", "Capital Receipts",
        "Tax Revenue", "Non-Tax Revenue", "Own-Tax Revenue", "Share of Union Taxes and Duties"
      ],
      parents: [
        "", "Total Receipts", "Total Receipts",
        "Revenue Receipts", "Revenue Receipts", "Tax Revenue", "Tax Revenue"
      ],
      values: [274109, 229080, 45029, 178298, 13914, 143702, 34596],
      branchvalues: "total"
    }
  ];

const data = {
  nodes: [
    // { id: "John" },
    // { id: "Raoul" },
    // { id: "Jane" },
    // { id: "Marcel" }
    { id: "Tax Revenue" },
    { id: "Own-Tax Revenue" },
    { id: "Share of Union Taxes and Duties" },
    { id: "Non-Tax Revenue" },
    { id: "Grants-in-Aid and Contributions" },
    { id: "Revenue Receipts" },
    { id: "Recoveries of Loans and Advances" },
    { id: "Miscellaneous Capital Receipts" },
    { id: "Public Debt Receipts" },
    { id: "Capital Receipts" },
    { id: "Total Receipts" },
    { id: "Revenue Expenditure" },
    { id: "Interest Payments" },
    { id: "Capital Expenditure" },
    { id: "Loan and Advances" },
    { id: "Public Debt Repayment" },
    { id: "Transfer to Contingency Fund" },
    { id: "Total Disbursement out of Consolidated Fund" },
  ],


  links: [
    { source: "Own-Tax Revenue", target: "Tax Revenue", value: 143702 },
    { source: "Share of Union Taxes and Duties", target: "Tax Revenue", value: 34596 },
    { source: "Tax Revenue", target: "Revenue Receipts", value: 178298 },
    { source: "Non-Tax Revenue", target: "Revenue Receipts", value: 13914 },
    { source: "Grants-in-Aid and Contributions", target: "Revenue Receipts", value: 36868 },
    { source: "Recoveries of Loans and Advances", target: "Capital Receipts", value: 478 },
    { source: "Miscellaneous Capital Receipts", target: "Capital Receipts", value: 2 },
    { source: "Public Debt Receipts", target: "Capital Receipts", value: 44549 },
    { source: "Revenue Receipts", target: "Total Receipts", value: 229080 },
    { source: "Capital Receipts", target: "Total Receipts", value: 45029 },
    { source: "Total Receipts", target: "Total Disbursement out of Consolidated Fund", value: 274109 }, // <-- fixed
    { source: "Total Disbursement out of Consolidated Fund", target: "Revenue Expenditure", value: 215584 }, // <-- fixed
    { source: "Total Disbursement out of Consolidated Fund", target: "Interest Payments", value: 29643 }, // <-- fixed
    { source: "Total Disbursement out of Consolidated Fund", target: "Capital Expenditure", value: 57349 }, // <-- fixed
    { source: "Total Disbursement out of Consolidated Fund", target: "Loan and Advances", value: 3250 }, // <-- fixed
    { source: "Total Disbursement out of Consolidated Fund", target: "Public Debt Repayment", value: 15942 } // <-- fixed
  ]

};

export default function ChapterSummaryPage({ params }) {
  const { chapterNumber, locale } = params;
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-50 to-purple-100 py-10 px-2">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2 drop-shadow-lg">
          Chapter {chapterNumber} Summary
        </h1>
        <p className="text-purple-700 text-lg mb-4">
          {/* You can add a dynamic chapter description here */}
          This page provides a visual summary of the chapter using a Sankey chart.
        </p>
      </div>
      <div className="w-full max-w-5xl mt-4 z-50 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-6 text-center">Chapter Flow</h2>
        <SankeyChart
          data={data}
          height={400}
          locale={locale}
          chapterNumber={chapterNumber}
        />
      </div>
      <div className="w-full max-w-5xl mt-8 z-50 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-6 text-center">Chapter Sunburst</h2>
        <SunBurstChart
          data={sunburstData}
          width={600}
          height={500}
          title="Chapter Receipts Sunburst"
        />
      </div>

    </div>
  );
}