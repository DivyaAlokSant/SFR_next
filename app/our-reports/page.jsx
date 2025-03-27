import Link from "next/link";

async function getAllReports() {
  try {
    const reportsPromise = await fetch('http://localhost:1337/api/reports?populate=*');
    const reports = await reportsPromise.json();
    return reports.data || [];
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return [];
  }
}

export default async function page() {
  const reports = await getAllReports();
  console.log(reports)

  return (
    <div>
      <h1>This is our Reports page. Welcome</h1>
      <div className="space-y-4">
        {reports.length > 0 ? (
          reports.map((report) => (
            <Link
              className="group grid grid-cols-[140px_1fr] bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50"
              key={report.id}
              href={`/our-reports/${report.slug}`}
            >
              <div className="relative overflow-hidden">
                <img
                  className="transition duration-300 absolute inset-0 h-full w-full object-cover group-hover:scale-125 group-hover:rotate-12"
                  src={`http://localhost:1337${report.image.formats.small.url}`}
                  alt={report.image.name}
                />
              </div>
              <div className="p-4">
                <p className="text-xl text-gray-600 font-bold group-hover:text-gray-700">{report.title}</p>
                <p className="text-sm text-gray-500 leading-6">{report.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No reports available at the moment.</p>
        )}
      </div>
    </div>
  );
}
