import Link from "next/link";
import { getAllReports } from "@/app/api";

export default async function Page({ params }) {
  const { locale } = await params; // Await the params object to access its properties
  const reports = await getAllReports(locale); // Fetch reports for the current locale

  return (
    <div>
      <h1>
        {locale === "en"
          ? "This is our Reports page. Welcome"
          : "ನಮ್ಮ ವರದಿ ಪುಟಕ್ಕೆ ಸ್ವಾಗತ"}
      </h1>
      <div className="space-y-4">
        {reports.length > 0 ? (
          reports.map((report) => (
            <Link
              className="group grid grid-cols-[140px_1fr] bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50"
              key={report.id}
              href={`/${locale}/our-reports/${report.slug}`} // Include locale in the URL
            >
              <div className="relative overflow-hidden">
                {report.image?.formats?.small?.url ? (
                  <img
                    className="transition duration-300 absolute inset-0 h-full w-full object-cover group-hover:scale-125 group-hover:rotate-12"
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${report.image.formats.small.url}`}
                    alt={report.image.name || "Report Image"}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>
              <div className="p-4">
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
              ? "No reports available at the moment."
              : "ಈ ಕ್ಷಣಕ್ಕೆ ವರದಿಗಳು ಲಭ್ಯವಿಲ್ಲ."}
          </p>
        )}
      </div>
    </div>
  );
}