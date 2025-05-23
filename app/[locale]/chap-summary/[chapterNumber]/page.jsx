//import TooltipCard from "@/app/components/tooltipCard";
import React from "react";
import SankeyChart from "@/app/components/SankeyChart";
import SunBurstChart from "@/app/components/sunBurstChart";
import TooltipCard from "@/app/components/tooltipCard";
import { MdLocationOn, MdPeople, MdOutlineMoneyOff, MdTrendingUp, MdAccountBalanceWallet, MdBarChart } from "react-icons/md";
import KarnatakaMap from "@/app/components/karMap";
import TreeChart from "@/app/components/treeChart";

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


const sunburstData = [
  {
    type: "sunburst",
    labels: [
      "Total Receipts", "Revenue Receipts", "Capital Receipts",
      "Tax Revenue", "Non-Tax Revenue", "Own-Tax Revenue", "Share of Union Taxes and Duties", "Public Debt Receipts",
      "Recoveries of Loans and Advances", "Miscellaneous Capital Receipts",
    ],
    parents: [
      "", "Total Receipts", "Total Receipts",
      "Revenue Receipts", "Revenue Receipts", "Tax Revenue", "Tax Revenue", "Capital Receipts", "Capital Receipts", "Capital Receipts",
    ],
    values: [274109, 229080, 45029, 178298, 13914, 143702, 34596, 44549, 478, 2],
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
      <div className="grid grid-cols-3 gap-4 w-full max-w-4xl my-6">
        {/* Left column: 3 rows */}
        <div className="flex flex-col gap-6 w-full">
          <TooltipCard
            trigger={
              <div className="flex items-center justify-between w-full">
                <span className="text-base text-gray-800">Area - 1,91,791 sq KMs </span>
                <MdLocationOn className="text-3xl text-purple-600" />
              </div>
            }
            content="The state of Karnataka, in India, has a total area of 1,91,791 square kilometers (sq km). It is the eighth largest state in India by area. This area represents 5.83% of the total geographical area of India."
            className="w-full"
          />
          <TooltipCard
            trigger={
              <div className="flex items-center justify-between w-full">
                <span className="text-base text-gray-800">Population - 6.11 crores (2011 census)</span>
                <MdPeople className="text-3xl text-purple-600" />
              </div>
            }
            content="In 2023, the estimated population of Karnataka was 67,692,000. This figure is an estimate, as official census data is usually collected on a decennial basis. The state's population has been increasing over the years. For example, the population was 70,890,000 in 2022 and 69,960,000 in 2021."
            className="w-full"
          />
          <TooltipCard
            trigger={
              <div className="flex items-center justify-between w-full">
                <span className="text-base text-gray-800">Population below poverty line - 20.91%</span>
                <MdOutlineMoneyOff className="text-3xl text-purple-600" />
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
                <MdTrendingUp className="text-3xl text-purple-600" />
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
                <MdAccountBalanceWallet className="text-3xl text-purple-600" />
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
                <MdBarChart className="text-3xl text-purple-600" />
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

      <div className="w-full max-w-6xl mt-8 z-50 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">Government Accounts Flow</h2>
        <TreeChart data={sampleTreeData} />
      </div>

      <div className="w-full max-w-6xl mt-4 z-10 bg-white/75 rounded-xl shadow p-6">
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