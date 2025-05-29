

import React from "react";
import Link from "next/link";
import { MdLocationOn, MdPeople, MdOutlineMoneyOff, MdTrendingUp } from "react-icons/md";

function HeroSection({
  leftIcons = [],
  rightIcons = [],
  centerImage = "/mapKar.png",
  centerImageAlt = "Karnataka Map",
  centerImageWidth = 300,
  centerImageHeight = 300,
}) {
  // Left: label left, icon right
  const LeftIconCircle = ({ icon: Icon, label, link }) => (
    <Link href={link}>
      <div
        className="flex flex-row-reverse items-center group cursor-pointer"
        tabIndex={0}
        aria-label={label}
      >
        <div className="rounded-full border-2 border-blue-300 shadow-lg bg-white w-20 h-20 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:border-blue-500">
          <Icon className="text-3xl text-orange-700" />
        </div>
        <span className="mr-3 text-sm text-blue-800 text-center font-semibold">{label}</span>
      </div>
    </Link>
  );

  // Right: icon left, label right
  const RightIconCircle = ({ icon: Icon, label, link }) => (
    <Link href={link}>
      <div
        className="flex items-center group cursor-pointer"
        tabIndex={0}
        aria-label={label}
      >
        <div className="rounded-full border-2 border-blue-300 shadow-lg bg-white w-20 h-20 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:border-blue-500">
          <Icon className="text-3xl text-orange-700" />
        </div>
        <span className="ml-3 text-sm text-blue-800 text-center font-semibold">{label}</span>
      </div>
    </Link>
  );

  return (
    <div className="grid grid-cols-3 gap-10 w-full max-w-6xl my-6 items-center">
      {/* Left column: IconCircles with label left */}
      <div className="flex flex-col gap-10 w-full items-end">
        {leftIcons.map((item, idx) => (
          <LeftIconCircle key={idx} icon={item.icon} label={item.label} link={item.link} />
        ))}
      </div>

      {/* Center column: Image */}
      <div className="flex items-center justify-center">
        <img
          src={centerImage}
          alt={centerImageAlt}
          width={centerImageWidth}
          height={centerImageHeight}
          className="w-full h-auto mix-blend-multiply opacity-80 rounded-lg shadow-xl"
        />
      </div>

      {/* Right column: IconCircles with label right */}
      <div className="flex flex-col gap-10 w-full items-start">
        {rightIcons.map((item, idx) => (
          <RightIconCircle key={idx} icon={item.icon} label={item.label} link={item.link} />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
