import qs from 'qs';


const DEFAULT_REVALIDATE = 60;

export async function getAllReports(locale = 'en', fetchOptions = {}) {
  try {
    const query = qs.stringify(
      {
        locale,
        populate: '*',
      },
      { encodeValuesOnly: true }
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?${query}`,
      { next: { revalidate: DEFAULT_REVALIDATE }, ...fetchOptions }
    );
    const data = await response.json();
    console.log("reports data", data)
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return [];
  }
}

export async function fetchReport(slug, locale = 'en', fetchOptions = {}) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      locale,
      populate: {
        image: true,
        chapters: {
          sort: ['ChapterNumber:asc'],
          populate: {
            sub_chapters: {
              sort: ['subChapterOrder:asc'],
            },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?${query}`,
    { next: { revalidate: DEFAULT_REVALIDATE }, ...fetchOptions }
  );
  console.log('API Response Status:', response.status);

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error('API Error Details:', errorDetails);
    throw new Error(`Failed to fetch report: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("Reports data", data)
  return data.data?.[0] || null;
}

export async function fetchSubchapter(slug, subchapslug, locale = 'en', fetchOptions = {}) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: subchapslug,
        },
        chapter: {
          report: {
            slug: {
              $eq: slug,
            },
          },
        },
      },
      locale,
      populate: {
        dynamicContent: {
          on: {
            "content.chart-as-image": {
              populate: {
                chart: "*",
              },
            },
            "content.table": {
              populate: "*",
            },
            "content.para-content": {
              populate: "*",
            },
            "content.bar-chart": {
              populate: "*",
            },
            "content.line-chart": {
              populate: "*",
            },
            "content.combo-bar-line-chart": {
              populate: "*",
            },
            "content.pie-chart": {
              populate: "*",
            },
            "content.stack-bar-chart": {
              populate: "*",
            },
          },
        },
        chapter: {
          populate: {
            report: {
              populate: {
                chapters: {
                  sort: ["ChapterNumber:asc"],
                  populate: {
                    sub_chapters: {
                      sort: ["subChapterOrder:asc"],
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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sub-chapters?${query}`,
    { next: { revalidate: DEFAULT_REVALIDATE }, ...fetchOptions }
  );
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("API Error Details:", errorDetails);
    throw new Error(`Failed to fetch subchapter: ${response.statusText}`);
  }

  const data = await response.json();
  const subchapter = data.data[0];
  const chapter = subchapter?.chapter;
  const report = chapter?.report;

  return { report, subchapter };
}

export async function fetchSubchapterFloatingBtn(slug, subchapslug, locale = 'en', fetchOptions = {}) {
  const query = qs.stringify(
    {
      filters: {
        chapter: {
          report: {
            slug: {
              $eq: slug,
            },
          },
        },
      },
      locale,
      populate: {
        chapter: {
          populate: {
            report: true,
          },
        },
      },
      sort: ["chapter.ChapterNumber:asc", "subChapterOrder:asc"],
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sub-chapters?${query}`,
    { next: { revalidate: DEFAULT_REVALIDATE }, ...fetchOptions }
  );
  if (!response.ok) {
    const errorDetails = await response.text();
    //console.error("API Error Details:", errorDetails);
    throw new Error(`Failed to fetch subchapters: ${response.statusText}`);
  }

  const data = await response.json();
  const subChapters = data.data || [];
  const subchapter = subChapters.find((sub) => sub.slug === subchapslug);

  return { subchapter, subChapters };
}

export async function fetchChapters(slug, locale = 'en', fetchOptions = {}) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      locale,
      populate: {
        chapters: {
          sort: ["ChapterNumber:asc"],
          populate: {
            sub_chapters: {
              sort: ["subChapterOrder:asc"],
            },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reports?${query}`,
    { next: { revalidate: DEFAULT_REVALIDATE }, ...fetchOptions }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch chapters: ${response.statusText}`);
  }

  const data = await response.json();
  const report = data.data?.[0];
  return report?.chapters || [];
}


export async function fetchChapterCards(locale = 'en', fetchOptions = {}) {
  const query = qs.stringify(
    {
      locale,
      populate: {
        image: true,
      },
      sort: ['chapterNumber:asc'],
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chapter-cards?${query}`,
    { next: { revalidate: 600 }, ...fetchOptions }
  );

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("API Error Details:", errorDetails);
    throw new Error(`Failed to fetch chapter cards: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("fetchChapterCards API response:", data);
  return data.data || [];
}

export async function fetchLandingPage(locale = 'en', fetchOptions = {}) {
  const query = qs.stringify(
    {
      locale,
      populate: {
        dynamicContent: {
          on: {
            "content.chart-as-image": {
              populate: {
                chart: "*",
              },
            },
            "content.table": {
              populate: "*",
            },
            "content.para-content": {
              populate: "*",
            },
            "content.bar-chart": {
              populate: "*",
            },
            "content.line-chart": {
              populate: "*",
            },
            "content.combo-bar-line-chart": {
              populate: "*",
            },
            "content.pie-chart": {
              populate: "*",
            },
            "content.stack-bar-chart": {
              populate: "*",
            },
            "content.sankey-chart": {
              populate: "*",
            },
            "content.tableu-chart": {
              populate: "*",
            },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/landing-pages?${query}`,
    { next: { revalidate: DEFAULT_REVALIDATE }, ...fetchOptions }
  );

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("API Error Details:", errorDetails);
    throw new Error(`Failed to fetch landing page: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || null;
}



export async function fetchOverviewTab(locale = 'en', fetchOptions = {}) {
  const query = qs.stringify(
    {
      locale,
      populate: {
        dynamicContent: {
          on: {
            "content.text-card": {
              populate: "*",
            },
             "content.para-content": {
              populate: "*",
            },
             "content.chart-as-image": {
              populate: {
                chart: "*",
              },
            },

          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/overview-tabs?${query}`,
    { next: { revalidate: DEFAULT_REVALIDATE }, ...fetchOptions }
  );

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("API Error Details:", errorDetails);
    throw new Error(`Failed to fetch overview tab: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || null;
}



export async function fetchFinancesofstatesTab(locale = 'en', fetchOptions = {}) {
  const query = qs.stringify(
    {
      locale,
      populate: {
        dynamicContent: {
          on: {
            "content.text-card": {
              populate: "*",
            },
             "content.para-content": {
              populate: "*",
            },
             "content.chart-as-image": {
              populate: {
                chart: "*",
              },
            },
            "content.sankey-chart": {
              populate: "*"
            },

          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/financesofstates-tabs?${query}`,
    { next: { revalidate: DEFAULT_REVALIDATE }, ...fetchOptions }
  );

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("API Error Details:", errorDetails);
    throw new Error(`Failed to fetch overview tab: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || null;
}

