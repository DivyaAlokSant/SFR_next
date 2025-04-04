
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

async function fetchChapters(slug) {
  const response = await fetch(
    `http://localhost:1337/api/reports?filters[slug][$eq]=${slug}&populate[chapters][populate][sub_chapters]=true`
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

  // Fetch chapters data server-side
  let chapters = [];
  try {
    chapters = await fetchChapters(slug);
  } catch (error) {
    console.error('Error fetching chapters:', error);
  }

  return (
    <SidebarProvider>
      <div className="flex p-8 overflow-x-auto">
        {/* Sidebar */}
        <div className=" p-6  bg-gray-100">
          <AppSidebar chapters={chapters} reportSlug={slug} />
        </div>

        {/* Main Content */}
        <div className="p-5 overflow-x-auto">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}