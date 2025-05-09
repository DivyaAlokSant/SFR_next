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
import { usePathname } from "next/navigation";

export default function SidebarPro({ chapters, reportSlug, locale }) {
  const pathname = usePathname(); // Get the current route

  return (
    <Sidebar>
      <SidebarContent>
        {chapters.map((chapter) => (
          <SidebarGroup key={chapter.id}>
            <SidebarGroupLabel className="bg-slate-300 text-sm text-slate-900">
              {chapter.ChapterName}
            </SidebarGroupLabel>
            <SidebarMenu>
              {(chapter.sub_chapters || []).map((subchapter) => {
                const isActive = pathname === `/${locale}/our-reports/${reportSlug}/${subchapter.slug}`;
                return (
                  <SidebarMenuItem key={subchapter.id}>
                    <SidebarMenuButton
                      asChild
                      className={`px-1 py-0 text-xs h-7 min-h-0 leading-tight ${
                        isActive ? "bg-gray-200 font-bold text-gray-900" : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <Link
                        href={`/${locale}/our-reports/${reportSlug}/${subchapter.slug}`}
                        className="block"
                      >
                        {subchapter.subChapterName}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}