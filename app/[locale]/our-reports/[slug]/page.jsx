import { fetchReport } from '@/app/api';

export default async function Page({ params }) {
  const { slug, locale } = await params; // Get the slug and locale from dynamic route params

  let report;
  try {
    report = await fetchReport(slug, locale); // Pass the locale to fetch the localized report
    //console.log('Fetched Report:', report);
  } catch (error) {
    console.error('Error fetching report:', error);
    report = null; // Fallback to null if fetching fails
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        {report ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{report.title}</h1>
            <h2 className="text-xl text-gray-700 mb-4">{report.description}</h2>
            {report.image && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${report.image.formats.small.url}`}
                alt={report.title}
                className="w-auto h-auto mb-6 rounded-lg shadow-md justify-center mx-auto"
              />
            )}
          </>
        ) : (
          <p className="text-gray-500">
            {locale === 'en'
              ? 'Report not found or failed to load.'
              : 'ವರದಿ ಲಭ್ಯವಿಲ್ಲ ಅಥವಾ ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ.'}
          </p>
        )}
      </div>
    </div>
  );
}