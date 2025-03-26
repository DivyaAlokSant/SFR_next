'use client'

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarProvider>
      <div className="flex relative">
        <button
          className="absolute top-2 left-16 bg-gray-200 p-1 rounded-full z-20"
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <div className={`relative ${collapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
          <AppSidebar />
        </div>
        <main className="flex-1 p-5">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}