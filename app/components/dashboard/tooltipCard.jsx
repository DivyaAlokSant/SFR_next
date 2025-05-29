"use client";
import { useState } from "react";

export default function TooltipCard({ trigger, content, className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      <div
        className={`rounded-lg min-h-[60px] flex  cursor-pointer transition-shadow hover:shadow-lg px-3 ${className}`}
      >
        <span className="text-base font-semibold tracking-wide  text-transparent drop-shadow-lg">
          {trigger}
        </span>
      </div>

      {open && (
        <div className="absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full mt-1 w-72 rounded-md border border-gray-200 bg-white p-4 text-gray-700 shadow-xl animate-fade-in delay-300 z-50">
          <span className="text-sm">{content}</span>
        </div>
      )}

      {/* <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.2s ease-in-out;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.97);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style> */}
    </div>
  );
}