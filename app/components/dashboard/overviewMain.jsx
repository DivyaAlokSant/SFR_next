import React from "react";
import { FaMapMarkedAlt, FaUsers, FaChartLine, FaBookOpen, FaSitemap, FaPray } from "react-icons/fa";
import Link from "next/link";

const ICONS = [
    {
        icon: FaSitemap,
        label: "Administrative Divisions",
        desc: "31 districts  232 taluks",
        color: "text-red-500",
        border: "border-red-300",
        link: "/admin-divisions",
        pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    },
    {
        icon: FaBookOpen,
        label: "Literacy Rate",
        desc: "75.36 % (2011 census) 12th in India",
        color: "text-orange-400",
        border: "border-orange-200",
        link: "/literacy",
        pos: "top-1/4 left-0 -translate-x-1/2 -translate-y-1/2",
    },
    {
        icon: FaPray,
        label: "Poverty Rate",
        desc: "20.9 % of Population below poverty line",
        color: "text-yellow-400",
        border: "border-yellow-200",
        link: "/poverty",
        pos: "bottom-1/4 left-0 -translate-x-1/2 translate-y-1/2",
    },
    {
        icon: FaMapMarkedAlt,
        label: "1,91,791 sq km 7th largest in India",
        desc: "The state's land size",
        color: "text-green-500",
        border: "border-green-300",
        link: "/area",
        pos: "top-1/4 right-0 translate-x-1/2 -translate-y-1/2",
    },
    {
        icon: FaUsers,
        label: "Population",
        desc: "6.11 crore (2011 census) 9th largest in India",
        color: "text-blue-500",
        border: "border-blue-300",
        link: "/population",
        pos: "bottom-1/4 right-0 translate-x-1/2 translate-y-1/2",
    },
    {
        icon: FaChartLine,
        label: "Population Growth",
        desc: "8.09 % (2014-2024)",
        color: "text-lime-500",
        border: "border-lime-300",
        link: "/growth",
        pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    },
];

export default function OverviewMain() {
    return (
        <div className="relative w-full flex flex-col items-center py-10 mb-10">
            <h2 className="text-2xl font-bold text-gray-700 mb-24 text-center">
                Karnataka Demography
            </h2>
            <div className="relative w-[420px] h-[420px] mx-auto  pt-12 pb-12">
                {/* Central Circle/Image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg flex items-center justify-center w-48 h-48 z-10 border-4 border-gray-100">
                    {/* Replace with your image if needed */}
                    <img
                        src="/mapKar.png"
                        alt="Karnataka Map"
                        width={200}
                        height={200}
                    />
                    {/* <span className="text-6xl text-gray-300">KA</span> */}
                </div>
                {/* Icons Around the Center */}
                {ICONS.map((item) => (
                    <Link
                        key={item.label}
                        href={item.link}
                        className={`absolute ${item.pos} flex flex-col items-center group`}
                        style={{ width: 140 }}
                    >
                        <div
                            className={`rounded-full bg-white shadow-lg border-4 ${item.border} w-20 h-20 flex items-center justify-center mb-2 transition-transform group-hover:scale-110`}
                        >
                            <item.icon className={`text-4xl ${item.color}`} />
                        </div>
                        <span className={`font-semibold ${item.color} text-center`}>
                            {item.label}
                        </span>
                        <span className="text-xs text-gray-500 text-center">{item.desc}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}