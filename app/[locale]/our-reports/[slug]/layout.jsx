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
    <SidebarPro chapters={chapters} reportSlug={slug} locale={locale}>
      {children}
    </SidebarPro>
  </SidebarProvider>
  );
}