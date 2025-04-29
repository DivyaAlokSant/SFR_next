import qs from 'qs';

export async function getAllReports(locale = 'en') {
  try {
    const query = qs.stringify(
      {
        locale, // Include the locale parameter
        populate: '*',
      },
      { encodeValuesOnly: true }
    );

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?${query}`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return [];
  }
}

export async function fetchReport(slug, locale = 'en') {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug, // Filter by report slug
        },
      },
      locale, // Include the locale parameter
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
    { encodeValuesOnly: true }
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?${query}`);
  console.log('API Response Status:', response.status);

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error('API Error Details:', errorDetails);
    throw new Error(`Failed to fetch report: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data?.[0] || null; // Return the first report or null if not found
}

export async function fetchSubchapter(slug, subchapslug, locale = 'en') {
  const query = qs.stringify(
    {
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
      locale, // Include the locale parameter
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
            "content.bar-chart": {
              populate: "*", // Populate all fields for the bar chart component
            },
            "content.line-chart": {
              populate: "*", // Populate all fields for the line chart component
            },
            "content.combo-bar-line-chart": {
              populate: "*", // Populate all fields for the line chart component
            },
            "content.pie-chart": {
              populate: "*", // Populate all fields for the line chart component
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
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sub-chapters?${query}`);
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("API Error Details:", errorDetails);
    throw new Error(`Failed to fetch subchapter: ${response.statusText}`);
  }

  const data = await response.json();
  const subchapter = data.data[0]; // Directly access the first subchapter
  const chapter = subchapter?.chapter; // Access the parent chapter
  const report = chapter?.report; // Access the parent report

  return { report, subchapter };
}

export async function fetchSubchapterFloatingBtn(slug, subchapslug, locale = 'en') {
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
      locale, // Include the locale parameter
      populate: {
        chapter: {
          populate: {
            report: true,
          },
        },
      },
      sort: ["chapter.ChapterNumber:asc", "subChapterOrder:asc"], // Sort by chapter and subchapter order
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sub-chapters?${query}`);
  if (!response.ok) {
    const errorDetails = await response.text();
    //console.error("API Error Details:", errorDetails);
    throw new Error(`Failed to fetch subchapters: ${response.statusText}`);
  }

  const data = await response.json();
  const subChapters = data.data || []; // All subchapters in the report

  // Find the current subchapter
  const subchapter = subChapters.find((sub) => sub.slug === subchapslug);

  return { subchapter, subChapters };
}

export async function fetchChapters(slug, locale = 'en') {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug, // Filter by report slug
        },
      },
      locale, // Include the locale parameter
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
    { encodeValuesOnly: true }
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?${query}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch chapters: ${response.statusText}`);
  }

  const data = await response.json();
  const report = data.data?.[0];
  return report?.chapters || [];
}