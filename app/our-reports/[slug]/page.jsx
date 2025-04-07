import qs from 'qs';

async function fetchReport(slug) {
  const ourQuery = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug, // Filter by report slug
        },
      },
      populate: {
        image: true,
        chapters: {
          sort: ['ChapterNumber:asc'], // Sort chapters by ChapterNumber
          populate: {
            sub_chapters: {
              sort: ['subChapterOrder:asc'], // Sort subchapters by subChapterOrder
            },
          },
        },
      },
    },
    { encodeValuesOnly: true } // Ensure proper encoding of query parameters
  );

  const response = await fetch(`http://localhost:1337/api/reports?${ourQuery}`);
  console.log('API Response Status:', response.status);

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error('API Error Details:', errorDetails);
    throw new Error(`Failed to fetch report: ${response.statusText}`);
  }

  const report = await response.json();
  return report.data?.[0] || null; // Return the first report or null if not found
}

export default async function Page({ params }) {
  const { slug } = await params; // Explicitly await the params promise

  let report;
  try {
    report = await fetchReport(slug);
    console.log('Fetched Report:', report);
  } catch (error) {
    console.error('Error fetching report:', error);
    report = null; // Fallback to null if fetching fails
  }

  return (
    <div >
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        {report ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{report.title}</h1>
            <h2 className="text-xl text-gray-700 mb-4">{report.description}</h2>
            {report.image && (
              <img
                src={`http://localhost:1337${report.image.formats.small.url}`}
                alt={report.title}
                className="w-auto h-auto mb-6 rounded-lg shadow-md justify-center mx-auto"
              />
            )}
          </>
        ) : (
          <p className="text-gray-500">Report not found or failed to load.</p>
        )}
      </div>
    </div>
  );
}