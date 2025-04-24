"use client";

import { useState } from "react";
import Image from "next/image";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar is open by default

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Sidebar */}
      <Sidebar
        className={`fixed inset-y-0 left-0 z-100 w-64 bg-gray-200 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          visibility: isSidebarOpen ? "visible" : "hidden", // Hide the sidebar when closed
        }}
      >
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

      {/* Burger Button */}
      <button
        className={`fixed top-4 left-1 z-50 bg-white p-2 rounded-md shadow-md flex items-center justify-center transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-64" : "translate-x-0"
        }`}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <Image
          src="/menu.svg" // Path to the menu.png file
          alt="Menu"
          width={24}
          height={24}
        />
      </button>

      {/* Main Content */}
      <div
        className={`transition-transform duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Add your main content here */}
      </div>
    </div>
  );
}