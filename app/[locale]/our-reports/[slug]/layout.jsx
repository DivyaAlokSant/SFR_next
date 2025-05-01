import SidebarPro from "@/app/components/sidebar-pro";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { fetchChapters } from "@/app/api";

export default async function Layout({ children, params }) {
  const { slug, locale } = await params;

  let chapters = [];
  try {
    chapters = await fetchChapters(slug, locale);
  } catch (error) {
    console.error("Error fetching chapters:", error);
  }

  return (
    <SidebarProvider>
      <div className="relative flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <SidebarPro chapters={chapters} reportSlug={slug} locale={locale} />
        {/* Sidebar toggle button (visible on mobile, hidden on desktop) */}
        <SidebarTrigger className="fixed top-4 left-4 z-50 md:hidden" />
        {/* Main content: add left margin on desktop to avoid being hidden */}
        <div className="flex-1 mx-auto bg-white/60 rounded-xl py-2 px-2 m-4 min-w-0 md:ml-[16rem] transition-all">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}