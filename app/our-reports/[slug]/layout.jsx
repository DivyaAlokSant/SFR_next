
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

async function fetchChapters(slug) {
  const response = await fetch(
    `http://localhost:1337/api/reports?filters[slug][$eq]=${slug}&populate[chapters][sort]=ChapterNumber:asc&populate[chapters][populate][sub_chapters][sort]=subChapterOrder:asc`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch chapters: ${response.statusText}`);
  }

  const data = await response.json();
  const report = data.data?.[0];
  return report?.chapters || [];
}

export default async function Layout({ children, params }) {
  const { slug } = params;

  let chapters = [];
  try {
    chapters = await fetchChapters(slug);
  } catch (error) {
    console.error("Error fetching chapters:", error);
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 mx-auto rounded-xl py-5">
      <SidebarProvider>
       
          <AppSidebar chapters={chapters} reportSlug={slug} />
       
      </SidebarProvider>
      </div>

      {/* Main Content */}
      
      
  <div className="flex-1 mx-auto bg-white/60 rounded-xl py-7 px-8 m-6">
    {children}
  </div>

</div>

  
  );
}
