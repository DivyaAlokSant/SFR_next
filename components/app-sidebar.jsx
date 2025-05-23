

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ chapters, reportSlug, locale }) {
  return (
    <div className="h-full overflow-y-auto">
      <Sidebar>
        <SidebarContent>
          {chapters.map((chapter) => (
            <SidebarGroup key={chapter.id}>
              <SidebarGroupLabel className="bg-gray-200 text-sm text-slate-900">
                {chapter.ChapterName}
              </SidebarGroupLabel>
              <SidebarMenu>
                {(chapter.sub_chapters || []).map((subchapter) => (
                  <SidebarMenuItem key={subchapter.id}>
                    <SidebarMenuButton
                      asChild
                      className="px-1 py-1 text-xs"
                    >
                      <Link
                        href={`/${locale}/our-reports/${reportSlug}/${subchapter.slug}`}
                      >
                        <span className="bg-gray-100">
                          {subchapter.subChapterName}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
    </div>
  );
}