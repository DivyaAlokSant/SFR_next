"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export default function SidebarPro({ chapters, reportSlug, locale }) {
  return (
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
                    <a
                      href={`/${locale}/our-reports/${reportSlug}/${subchapter.slug}`}
                      className="block text-gray-700 hover:text-gray-900"
                    >
                      {subchapter.subChapterName}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}