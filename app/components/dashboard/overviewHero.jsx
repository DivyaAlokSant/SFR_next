import React from "react";
import { FaUsers, FaBook, FaCalculator } from "react-icons/fa";
import Link from "next/link";

const ICONS = [
  {
    icon: FaUsers,
    label: "Demographics",
    color: "bg-blue-400",
    text: "text-blue-600",
    link: "#overview-main",
  },
  {
    icon: FaBook,
    label: "Government Accounts",
    color: "bg-green-400",
    text: "text-green-600",
    link: "#overview-GA",
  },
  {
    icon: FaCalculator,
    label: "Budget Process",
    color: "bg-yellow-300",
    text: "text-yellow-600",
    link: "/budget-process",
  },
];

export default function OverviewHero() {
  return (
    <div className="w-full flex flex-col items-center py-10 mb-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-12 text-center">
        Overview of Government Accounts process
      </h2>
      <div className="flex flex-row items-end justify-center gap-12 w-full">
        {ICONS.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <Link href={item.link} className="group">
              <div
                className={`relative flex items-center justify-center w-36 h-36 rounded-full border-4 border-gray-200 shadow-lg ${item.color} group-hover:scale-105 transition-transform`}
              >
                <item.icon className="text-white text-6xl" />
              </div>
              <div className="flex flex-col items-center mt-4">
                <span className={`font-bold text-lg ${item.text}`}>{item.label}</span>
              </div>
            </Link>
            {/* Arrow */}
            <div className="w-full flex justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" className="mt-2">
                <line x1="16" y1="0" x2="16" y2="24" stroke="#888" strokeWidth="2" />
                <polyline points="8,20 16,28 24,20" fill="none" stroke="#888" strokeWidth="2" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}