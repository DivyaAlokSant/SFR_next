import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { fetchChapters } from '@/app/api';

export default async function Layout({ children, params }) {
  const { slug, locale } =await params; // Extract locale from params

  let chapters = [];
  try {
    chapters = await fetchChapters(slug, locale); // Pass locale to fetchChapters
  } catch (error) {
    console.error("Error fetching chapters:", error);
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 mx-auto rounded-xl py-5">
        <SidebarProvider>
          <AppSidebar
            chapters={chapters}
            reportSlug={slug}
            locale={locale} // Pass locale to AppSidebar
          />
        </SidebarProvider>
      </div>

      {/* Main Content */}
      <div className="flex-1 mx-auto bg-white/60 rounded-xl py-7 px-8 m-6">
        {children}
      </div>
    </div>
  );
}