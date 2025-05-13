"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SidebarPro({ chapters, reportSlug, locale, children }) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (chapterId) => {
    setOpenGroups((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar trigger for mobile */}
      <SidebarTrigger className="fixed top-4 left-4 z-50 md:hidden" />
      <Sidebar className="bg-gray-100">
        <SidebarContent>
          {chapters.map((chapter) => {
            const isOpen = openGroups[chapter.id] || false;
            return (
              <SidebarGroup key={chapter.id}>
                <SidebarGroupLabel
                  className="bg-slate-300 text-sm text-slate-900 flex items-center justify-between cursor-pointer px-2 py-1"
                  onClick={() => toggleGroup(chapter.id)}
                >
                  <span>{chapter.ChapterName}</span>
                  <ChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </SidebarGroupLabel>
                {isOpen && (
                  <SidebarMenu>
                    {(chapter.sub_chapters || []).map((subchapter) => {
                      const isActive =
                        pathname ===
                        `/${locale}/our-reports/${reportSlug}/${subchapter.slug}`;
                      return (
                        <SidebarMenuItem key={subchapter.id}>
                          <SidebarMenuButton
                            asChild
                            className={`px-1 py-0 text-xs h-7 min-h-0 leading-tight ${
                              isActive
                                ? "bg-gray-200 font-bold text-gray-900"
                                : "text-gray-700 hover:text-gray-900"
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
                )}
              </SidebarGroup>
            );
          })}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="max-w-6xl mx-auto p-6 bg-white overflow-auto">{children}</div>
      </SidebarInset>
    </div>
  );
}