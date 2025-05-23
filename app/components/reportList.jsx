"use client";

import Link from "next/link";

export default function ReportList({ reports, locale }) {
  return (
    <div className="space-y-4">
      {reports.length > 0 ? (
        reports.map((report) => (
          <Link
            className="group grid grid-cols-[140px_1fr] bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50"
            key={report.id}
            href={`/${locale}/our-reports/${report.slug}`}
          >
            <div className="relative overflow-hidden">
              {report.image?.formats?.small?.url ? (
                <img
                  className="transition duration-300 absolute inset-0 h-full w-auto object-cover group-hover:scale-110"
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${report.image.formats.small.url}`}
                  alt={report.image.name || "Report Image"}
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            <div className="p-2">
              {/* SEO tags: visually hidden but present in DOM for SEO */}
              {Array.isArray(report.Tags) && report.Tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {report.Tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-500 px-2 py-0 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xl text-gray-600 font-bold group-hover:text-gray-700">
                {report.title}
              </p>
              <p className="text-sm text-gray-500 leading-6">
                {report.description}
              </p>
            </div>

          </Link>
        ))
      ) : (
        <p className="text-gray-500">
          {locale === "en"
            ? "No reports match your search."
            : "ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಯಾವುದೇ ವರದಿಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ."}
        </p>
      )}
    </div>
  );
}