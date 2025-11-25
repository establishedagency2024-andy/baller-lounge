import { Sidebar } from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import platinumBadge from "@/assets/platinum-member-badge.png";

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Platinum Member Badge */}
          <div className="mb-6">
            <img 
              src={platinumBadge} 
              alt="Platinum Member" 
              className="w-full max-w-2xl"
            />
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
