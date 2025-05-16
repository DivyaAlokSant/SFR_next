import { fetchReport } from '@/app/api';

export default async function Page({ params }) {
  const { slug, locale } = await params;

  let report;
  try {
    report = await fetchReport(slug, locale, { next: { revalidate: 600 } });
  } catch (error) {
    console.error('Error fetching report:', error);
    report = null;
  }

  return (
    <>
      {report ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{report.title}</h1>
          <h2 className="text-xl text-gray-700 mb-4">{report.description}</h2>
          {report.image && (
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${report.image.formats.small.url}`}
              alt={report.title}
              className="w-auto h-80 mb-6 rounded-lg shadow-md justify-center mx-auto"
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
    </>
  );
}