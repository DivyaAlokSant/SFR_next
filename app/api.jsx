import qs from 'qs';


export async function getAllReports() {
  try {
    const reportsPromise = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?populate=*`);
    const reports = await reportsPromise.json();
    return reports.data || [];
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return [];
  }
}

export async function fetchReport(slug) {
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

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?${ourQuery}`);
  console.log('API Response Status:', response.status);

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error('API Error Details:', errorDetails);
    throw new Error(`Failed to fetch report: ${response.statusText}`);
  }

  const report = await response.json();
  return report.data?.[0] || null; // Return the first report or null if not found
}

export async function fetchSubchapter(slug, subchapslug) {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: subchapslug, // Filter by subchapter slug
      },
      chapter: {
        report: {
          slug: {
            $eq: slug, // Ensure the subchapter belongs to the correct report
          },
        },
      },
    },
    populate: {
      dynamicContent: {
        on: {
          "content.chart-as-image": {
            populate: {
              chart: "*", // Populate the chart (image) field
            },
          },
          "content.table": {
            populate: "*", // Populate all fields for the table component
          },
          "content.para-content": {
            populate: "*", // Populate all fields for the para component
          },
        },
      },
      chapter: {
        populate: {
          report: {
            populate: {
              chapters: {
                sort: ["ChapterNumber:asc"], // Sort chapters by ChapterNumber
                populate: {
                  sub_chapters: {
                    sort: ["subChapterOrder:asc"], // Sort subchapters by subChapterOrder
                  },
                },
              },
            },
          },
        },
      },
    },
  }, { encodeValuesOnly: true }); // Ensure proper encoding of query parameters

  // console.log("Generated Query:", query);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sub-chapters?${query}`);
  // {console.log("API Response Status:", response.status);}

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("API Error Details:", errorDetails);
    throw new Error(`Failed to fetch subchapter: ${response.statusText}`);
  }

  const data = await response.json();
  // console.log("Fetched Data:", data);

  // Extract the subchapter and related data
  const subchapter = data.data[0]; // Directly access the first subchapter
  const chapter = subchapter?.chapter; // Access the parent chapter
  const report = chapter?.report; // Access the parent report

  return { report, subchapter };
};

export async function fetchSubchapterFloatingBtn(slug, subchapslug) {
  const query = qs.stringify(
    {
      filters: {
        chapter: {
          report: {
            slug: {
              $eq: slug, // Ensure the subchapter belongs to the correct report
            },
          },
        },
      },
      populate: {
        chapter: {
          populate: {
            report: true,
          },
        },
      },
      sort: ["chapter.ChapterNumber:asc", "subChapterOrder:asc"], // Sort by chapter and subchapter order
    },
    { encodeValuesOnly: true } // Ensure proper encoding of query parameters
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sub-chapters?${query}`);
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("API Error Details:", errorDetails);
    throw new Error(`Failed to fetch subchapters: ${response.statusText}`);
  }

  const data = await response.json();
  const subChapters = data.data || []; // All subchapters in the report

  // Find the current subchapter
  const subchapter = subChapters.find((sub) => sub.slug === subchapslug);

  return { subchapter, subChapters };
};


export async function fetchChapters(slug) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug, // Filter by report slug
        },
      },
      populate: {
        chapters: {
          sort: ["ChapterNumber:asc"], // Sort chapters by ChapterNumber
          populate: {
            sub_chapters: {
              sort: ["subChapterOrder:asc"], // Sort subchapters by subChapterOrder
            },
          },
        },
      },
    },
    { encodeValuesOnly: true } // Ensure proper encoding of query parameters
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?${query}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch chapters: ${response.statusText}`);
  }

  const data = await response.json();
  const report = data.data?.[0];
  return report?.chapters || [];
}