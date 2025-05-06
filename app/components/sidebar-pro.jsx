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
import Link from "next/link";

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
                    className="px-1 py-0 text-xs h-7 min-h-0 leading-tight"
                  >
                    <Link
                      href={`/${locale}/our-reports/${reportSlug}/${subchapter.slug}`}
                      className="block text-gray-700 hover:text-gray-900"
                    >
                      {subchapter.subChapterName}
                    </Link>
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