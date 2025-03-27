"use client";

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

export function AppSidebar({ chapters, reportSlug }) {
  return (
    <div >
      <Sidebar>
        <SidebarContent>
          {chapters.map((chapter) => (
            <SidebarGroup key={chapter.id}>
              <SidebarGroupLabel>{chapter.ChapterName}</SidebarGroupLabel>
              <SidebarMenu>
                {(chapter.sub_chapters || []).map((subchapter) => (
                  <SidebarMenuItem key={subchapter.id}>
                    <SidebarMenuButton asChild>
                      <Link href={`/our-reports/${reportSlug}/${subchapter.slug}`}>
                        <span>{subchapter.subChapterName}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
