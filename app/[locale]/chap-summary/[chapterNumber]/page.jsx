//import TooltipCard from "@/app/components/tooltipCard";
import React from "react";
import SankeyChart from "@/app/components/SankeyChart";
import SunBurstChart from "@/app/components/sunBurstChart";
import TooltipCard from "@/app/components/tooltipCard";
import { MdLocationOn, MdPeople, MdOutlineMoneyOff, MdTrendingUp, MdAccountBalanceWallet, MdBarChart } from "react-icons/md";
import KarnatakaMap from "@/app/components/karMap";
import TreeChart from "@/app/components/treeChart";
import RadarChart from "@/app/components/radarChart";

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

const BSdata = [
  {
    type: "sunburst",
    //branchvalues: "total",
    labels: [
      "Total",                 // Root node
      "Liabilities", "Assets", // First Level
      "Consolidated Fund (L)", "Contingency Fund (L)", "Public Account (L)",
      "Consolidated Fund (A)", "Contingency Fund (A)", "Public Account (A)",
      "Internal Debt", "Loans and Advances from GoI", // Consolidated Fund - L
      "Gross Capital Outlay", "Loans and Advances",   // Consolidated Fund - A
      "Contingency Fund (L) Value", "Contingency Fund (A) Value",
      "Small Savings, Provident Funds etc.", "Deposits", "Reserve Funds", "Suspense and Miscellaneous (L)", // Public Account - L
      "Advances", "Remittance", "Suspense and Miscellaneous (A)", "Cumulative Excess of Expenditure", "Cash Balance" // Public Account - A
    ],
    parents: [
      "",                      // Total
      "Total", "Total",
      "Liabilities", "Liabilities", "Liabilities",
      "Assets", "Assets", "Assets",
      "Consolidated Fund (L)", "Consolidated Fund (L)",
      "Consolidated Fund (A)", "Consolidated Fund (A)",
      "Contingency Fund (L)", "Contingency Fund (A)",
      "Public Account (L)", "Public Account (L)", "Public Account (L)", "Public Account (L)",
      "Public Account (A)", "Public Account (A)", "Public Account (A)", "Public Account (A)", "Public Account (A)"
    ],
    values: [
      // Total is sum of all values
      1173383,       // = Sum of all below
      544994,        // Liabilities total
      628389,        // Assets total
      470861,        // Consolidated Fund (L) = 417455 + 53406
      500,           // Contingency Fund (L)
      190933,        // Public Account (L) = 49290 + 67348 + 67969 + 6026
      550826,        // Consolidated Fund (A) = 508558 + 42268
      0,             // Contingency Fund (A) = "-"
      77563,         // Public Account (A) = 7 + 992 + 0 + 2905 + 107264
      417455, 53406,
      508558, 42268,
      500, 0,
      49290, 67348, 67969, 6026,
      7, 992, 0, 2905, 107264
    ]
  }
];

const receiptsData = [
  {
    type: "sunburst",
    labels: [
      "Total Receipts",
      "Revenue Receipts", "Capital Receipts",

      "Tax Revenue", "Non-Tax Revenue", "Grants-in-Aid and Contributions",
      "Own-Tax Revenue", "Share of Union Taxes and Duties",

      "Recoveries of Loans and Advances", "Miscellaneous Capital Receipts", "Public Debt Receipts"
    ],
    parents: [
      "", 
      "Total Receipts", "Total Receipts",

      "Revenue Receipts", "Revenue Receipts", "Revenue Receipts",
      "Tax Revenue", "Tax Revenue",

      "Capital Receipts", "Capital Receipts", "Capital Receipts"
    ],
    values: [
      310963,          // Total Receipts = Sum of all children below
      233343,          // Revenue Receipts = Tax + Non-Tax + Grants
      77620,           // Capital Receipts = Recoveries + Misc + Debt

      204698, 13117, 15528,
      163505, 41193,

      306, 36, 90280
    ],
   // branchvalues: "total"
  }
];

const expenditureData = [
  {
    type: "sunburst",
    labels: [
      "Total Expenditure",
      "Revenue Expenditure", "Capital Expenditure",
      "Interest Payments", "Loan and Advances", "Public Debt Repayment"
    ],
    parents: [
      "", 
      "Total Expenditure", "Total Expenditure",
      "Revenue Expenditure", "Capital Expenditure", "Capital Expenditure"
    ],
    values: [
      294734,   // Total Expenditure
      242614,   // Revenue Expenditure
      52120,    // Capital Expenditure
      31872,    // Interest Payments
      4473,     // Loan and Advances
      22453     // Public Debt Repayment
    ],
    //branchvalues: "total"
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
    { source: "Total Receipts", target: "Total Disbursement out of Consolidated Fund", value: 274109 },
    { source: "Total Disbursement out of Consolidated Fund", target: "Revenue Expenditure", value: 215584 },
    { source: "Total Disbursement out of Consolidated Fund", target: "Interest Payments", value: 29643 },
    { source: "Total Disbursement out of Consolidated Fund", target: "Capital Expenditure", value: 57349 },
    { source: "Total Disbursement out of Consolidated Fund", target: "Loan and Advances", value: 3250 },
    { source: "Total Disbursement out of Consolidated Fund", target: "Public Debt Repayment", value: 15942 }
  ]

};

const radarData = [
  {
    category: "Gross Capital Outlay",
    growth: 11,
  },
  {
    category: "Loans & Advances (Assets)",
    growth: 11,
  },
  {
    category: "Internal Debt (Liabilities)",
    growth: 18,
  },
  {
    category: "Loans from GoI (Liabilities)",
    growth: 9,
  },
  {
    category: "Cash Balance incl. Earmarked Funds",
    growth: 28,
  }
];


export default async function ChapterSummaryPage({ params }) {
  const { chapterNumber, locale } = params;
  return (

    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-2">

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 mb-10 text-center">
        <h1 className="text-xl font-bold text-blue-800 mb-2 drop-shadow-md">
          Karnataka State Finances<br />Highlights 2024
        </h1>
        <p className="text-blue-700 text-lg mb-4 drop-shadow-lg">
          {/* You can add a dynamic chapter description here */}
          This page provides a visual summary of the State Finance Report for 2024
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full max-w-6xl my-6">
        {/* Left column: 3 rows */}
        <div className="flex flex-col gap-6 w-full">
          <TooltipCard
            trigger={
              <div className="flex items-center justify-between w-full">
                <span className="text-base text-gray-800">Area - 1,91,791 sq KMs </span>
                <MdLocationOn className="text-3xl text-orange-600" />
              </div>
            }
            content="The state of Karnataka, in India, has a total area of 1,91,791 square kilometers (sq km). It is the eighth largest state in India by area. This area represents 5.83% of the total geographical area of India."
            className="w-full"
          />
          <TooltipCard
            trigger={
              <div className="flex items-center justify-between w-full">
                <span className="text-base text-gray-800">Population - 6.11 crores (2011 census)</span>
                <MdPeople className="text-3xl text-orange-600" />
              </div>
            }
            content="In 2023, the estimated population of Karnataka was 67,692,000. This figure is an estimate, as official census data is usually collected on a decennial basis. The state's population has been increasing over the years. For example, the population was 70,890,000 in 2022 and 69,960,000 in 2021."
            className="w-full"
          />
          <TooltipCard
            trigger={
              <div className="flex items-center justify-between w-full">
                <span className="text-base text-gray-800">Population below poverty line - 20.91%</span>
                <MdOutlineMoneyOff className="text-3xl text-orange-600" />
              </div>
            }
            content="NSSO Estimates: The National Sample Survey Office (NSSO) estimated that 20% of Karnataka's population was below the poverty line (BPL) in 2010-11. <br><br> NITI Aayog Report: The NITI Aayog's Multidimensional Poverty Index baseline report in 2021 suggested that only 13.16% of the population is considered poor in Karnataka."
            className="w-full"
          />
        </div>


        {/* Center column: Map */}
        <div className="flex items-center justify-center  group-hover:shadow-2xl group-hover:-translate-y-3 group-hover:scale-105">
          <img
            src="/mapKar.png"
            alt="Karnataka Map"
            width={300}
            height={300}
            className="w-full h-auto mix-blend-multiply opacity-70 rounded-lg "
          />
          {/* <KarnatakaMap/> */}
        </div>
        {/* Right column: 3 rows */}
        <div className="flex flex-col gap-4">
          <TooltipCard
            trigger={
              <div className="flex items-center justify-between w-full gap-4">
                <MdTrendingUp className="text-3xl text-orange-600" />
                <span className="text-base text-gray-800">
                  Gross State Domestic Product (GSDP)- ₹ 25.67 lakh crores
                </span>
              </div>
            }
            content="Gross State Domestic Product (GSDP) is a measure of the total monetary value of all final goods and services produced within a state's boundaries during a specific period, typically a year."
            className="w-full"
          />
          <TooltipCard
            trigger={
              <div className="flex items-center justify-between w-full gap-4">
                <MdAccountBalanceWallet className="text-3xl text-orange-600" />
                <span className="text-base text-gray-800">
                  Per Capita GSDP ₹ 3,76,996
                </span>
              </div>
            }
            content="It's essentially the total value of goods and services produced within a country's borders (GDP) divided by the country's total population."
            className="w-full"
          />
          <TooltipCard
            trigger={
              <div className="flex items-center justify-between w-full gap-4">
                <MdBarChart className="text-3xl text-orange-600" />
                <span className="text-base text-gray-800">
                  Gross State Value Added (GSVA)
                </span>
              </div>
            }
            content="GSVA refers to the gross value added by a state, a key measure used in calculating the Gross State Domestic Product (GSDP)."
            className="w-full"
          />
        </div>
      </div>

      <div className="w-full max-w-6xl mt-8 z-50 bg-white/75 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">Pictorial depiction of the structure of Government Accounts</h2>
        <TreeChart data={sampleTreeData} />
      </div>

      <div className="w-full max-w-6xl mt-4 z-10 bg-white/75 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-6 text-center">Karnataka Government Receipts and Expenditure Flow</h2>
        <SankeyChart
          data={data}
          height={400}
          locale={locale}
          chapterNumber={chapterNumber}
        />
      </div>

      <div className="max-w-6xl grid grid-cols-2 gap-4">
        <div className=" mt-8 z-50 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-6 text-center">Total Receipts Breakup</h2>
        <SunBurstChart
          data={receiptsData}
          // width={600}
          // height={500}
          title="Receipts"
        />
        </div>
        <div className=" mt-8 z-50 bg-white rounded-xl shadow p-6">
           <h2 className="text-xl font-semibold text-purple-700 mb-6 text-center">Total Expenditure Breakup</h2>
        <SunBurstChart
          data={expenditureData}
          // width={600}
          // height={500}
          title="Expenditure"
        />
        </div>
      </div>


      

      <div className="w-full max-w-5xl mt-8 z-50 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-6 text-center">Summarised position of Assets and Liabilities (₹ in crore)</h2>
        <SunBurstChart
          data={BSdata}
          width={600}
          height={500}
          title="Summarised position of Assets and Liabilities (₹ in crore)"
        />
      </div>

      <div className="w-full max-w-5xl mt-8 z-50 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-6 text-center">Growth rate of various parameters compared from last year</h2>
        <RadarChart
        data={radarData}
        height={400}
      />
      </div>



    </div>
  );
}