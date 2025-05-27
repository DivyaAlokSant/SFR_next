import React from "react";

export default function TextCard({ heading, detail, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow p-6 flex flex-col items-start border border-gray-200 ${className}`}>
      <h3 className="text-lg font-bold text-blue-800 mb-2">{heading}</h3>
      <p className="text-gray-700 text-base">{detail}</p>
    </div>
  );
}