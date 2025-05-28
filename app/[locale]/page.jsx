import ChapCard from "../components/chapCard";
import { fetchChapterCards } from "../api";
import HeroSection from "@/app/components/heroSection";

import SunBurstChart from "../components/sunBurstChart";
import React from "react";
import { fetchLandingPage } from "../api";
import OurRenderer from "../components/ourRenderer";
import SankeyChart from "../components/SankeyChart";
import TooltipCard from "../components/tooltipCard";
import { MdOutlineScreenSearchDesktop,MdCurrencyRupee,MdAccountBalance,MdOutlineManageSearch } from "react-icons/md";
import TreeChart from "../components/treeChart";
import RadarChart from "../components/radarChart";
import TableauChart from "../components/tableuChart";

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
    { "source": "Own-Tax Revenue", target: "Tax Revenue", value: 143702 },
    { "source": "Share of Union Taxes and Duties", target: "Tax Revenue", value: 34596 },
    { "source": "Tax Revenue", target: "Revenue Receipts", value: 178298 },
    { "source": "Non-Tax Revenue", target: "Revenue Receipts", value: 13914 },
    { "source": "Grants-in-Aid and Contributions", target: "Revenue Receipts", value: 36868 },
    { "source": "Recoveries of Loans and Advances", target: "Capital Receipts", value: 478 },
    { "source": "Miscellaneous Capital Receipts", target: "Capital Receipts", value: 2 },
    { "source": "Public Debt Receipts", target: "Capital Receipts", value: 44549 },
    { "source": "Revenue Receipts", target: "Total Receipts", value: 229080 },
    { "source": "Capital Receipts", target: "Total Receipts", value: 45029 },
    { "source": "Total Receipts", target: "Total Disbursement out of Consolidated Fund", value: 274109 },
    { "source": "Total Disbursement out of Consolidated Fund", target: "Revenue Expenditure", value: 215584 },
    { "source": "Total Disbursement out of Consolidated Fund", target: "Interest Payments", value: 29643 },
    { "source": "Total Disbursement out of Consolidated Fund", target: "Capital Expenditure", value: 57349 },
    { "source": "Total Disbursement out of Consolidated Fund", target: "Loan and Advances", value: 3250 },
    { "source": "Total Disbursement out of Consolidated Fund", target: "Public Debt Repayment", value: 15942 }
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

const leftIcons = [
  { icon: MdOutlineManageSearch , label: "Overview", link: "/tabs" },
  { icon: MdAccountBalance, label: "Finances of states ", link: "/tabs" },
];
const rightIcons = [
  { icon: MdCurrencyRupee, label: "Budetary Management", link: "/tabs" },
  { icon: MdOutlineScreenSearchDesktop, label: "Audit Findings", link: "/tabs" },
];



export default async function Home({ params }) {
  const locale = params?.locale || "en";
  const landingPage = await fetchLandingPage(locale, { next: { revalidate: 600 } });
  const dynamicContent = Array.isArray(landingPage) && landingPage.length > 0
    ? landingPage[0].dynamicContent
    : [];
  //const chapterCards = await fetchChapterCards(locale);

  // Split cards for left and right columns
  // const leftCards = chapterCards.slice(0, 2);
  // const rightCards = chapterCards.slice(2, 4);



  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-200 via-blue-50 to-blue-200 py-10 px-2">

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 mb-10 text-center">
        <h1 className="text-xl font-bold text-blue-800 mb-2 drop-shadow-md">
          Karnataka State Finances<br />Highlights 2024
        </h1>
        <p className="text-blue-700 text-lg mb-4 drop-shadow-lg">
          {/* You can add a dynamic chapter description here */}
          This page provides a visual summary of the State Finance Report for 2024
        </p>
      </div>
      {/* <div className="grid grid-cols-3 gap-4 w-full max-w-6xl my-6">
      
        <div className="flex flex-col gap-6 w-full">
          {leftCards.map((chapter) => (
            <ChapCard key={chapter.id} chapter={{
              chapterName: chapter.chapterName,
              chapterNumber: chapter.chapterNumber,
              description: chapter.description,
              image: chapter.image?.url,
            }} locale={locale} />
          ))}
        </div>

        <div className="flex items-center justify-center group-hover:shadow-2xl group-hover:-translate-y-3 group-hover:scale-105">
          <img
            src="/mapKar.png"
            alt="Karnataka Map"
            width={300}
            height={300}
            className="w-full h-auto mix-blend-multiply opacity-70 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-6 w-full">
          {rightCards.map((chapter) => (
            <ChapCard key={chapter.id} chapter={{
              chapterName: chapter.chapterName,
              chapterNumber: chapter.chapterNumber,
              description: chapter.description,
              image: chapter.image?.url,
            }} locale={locale} />
          ))}
        </div>
      </div> */}

      <HeroSection
        leftIcons={leftIcons}
        rightIcons={rightIcons}
        centerImage="/mapKar.png"
        centerImageAlt="Karnataka Map"
      />

      {/* <TableauChart
        embedCode="<noscript><a href='#'><img alt='Sheet 1 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Di&#47;DistrictData_17483301341700&#47;Sheet1&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='DistrictData_17483301341700&#47;Sheet1' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Di&#47;DistrictData_17483301341700&#47;Sheet1&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1748331023540');                    var vizElement = divElement.getElementsByTagName('object')[0];                    vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';                    var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>" 
        height={400}
        width="85%"/> */}

      {/* <div className="w-full max-w-6xl mt-8 z-50 bg-white/75 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">Pictorial depiction of the structure of Government Accounts</h2>
        <TreeChart data={sampleTreeData} />
      </div>

      <div className="w-full max-w-6xl mt-4 z-10 bg-white/75 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-6 text-center">Karnataka Government Receipts and Expenditure Flow</h2>
        <SankeyChart
          data={data}
          height={400}
          locale={locale}
        // chapterNumber={chapterNumber}
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
      </div> */}

      <div className="w-full max-w-6xl flex flex-col gap-8">
        {console.log("LandingPage dynamicContent:", dynamicContent)}
        {dynamicContent?.map((item, i) => (
          <OurRenderer key={i} item={item} index={i} />
        ))}
      </div>

    </div>
  );
}