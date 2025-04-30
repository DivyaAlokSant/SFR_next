import SidebarPro from "@/components/sidebar-pro";
import { SidebarProvider } from "@/components/ui/sidebar";
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
      <div className="flex flex-col md:flex-row bg-gray-100 h-screen">
        <SidebarPro chapters={chapters} reportSlug={slug} locale={locale} />
        <div className="flex-1 mx-auto bg-white/60 rounded-xl py-2 px-2 m-4">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}