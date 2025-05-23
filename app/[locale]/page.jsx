import ChapterCardsGrid from "@/app/components/ChapterCardsGrid";
import Link from 'next/link';
import SunBurstChart from "../components/sunBurstChart";




export default function Home({ params }) {
  const locale = params?.locale || "en";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 py-12 px-2">
      {/* Main Icon and Heading */}
      <div className="flex flex-col items-center mb-8">
        {/* Placeholder for main icon */}
        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mb-4 shadow">
          {/* CAG Logo */}
          <img
            src="/cag-logo.png"
            alt="CAG Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          {/* <span className="text-4xl text-purple-500">📝</span> */}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 text-center mb-2 drop-shadow-md">
          Karnataka State Finances<br />Highlights 2024
        </h1>
        <p className="text-purple-700 text-center text-lg max-w-2xl drop-shadow-lg">
          Karnataka’s 2024 financial chapters reveal income, spending trends, debt status, and central aid to support informed fiscal planning.
        </p>
      </div>

      {/* Cards Grid */}
        <div className="w-full max-w-5xl mt-8 z-50">
          <ChapterCardsGrid locale={locale} />
        </div>

        
     
      {/* <div className="flex justify-center items-center min-h-screen">
        <DonutMenu
          sections={sections}
          centerText="Menu"
          size={400}
          innerRadius={110}
          outerRadius={180}
        />
      </div> */}
    </div>
  );
}