import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main
        className={cn(
          "flex-1 transition-all duration-300 relative overflow-hidden",
          isSidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(217,50%,25%)] via-[hsl(220,60%,8%)] to-[hsl(220,60%,5%)] pointer-events-none h-[800px]" />
        <div className="relative max-w-7xl mx-auto px-8 pt-8">
          <DashboardHeader />
          <Outlet />
        </div>
      </main>
    </div>
  );
}
