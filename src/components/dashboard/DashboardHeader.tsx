import { Crown } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="w-full bg-background mb-8">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-end">
        {/* Platinum Member Tile */}
        <div className="bg-gradient-to-br from-gray-400 via-gray-700 to-black px-6 py-3 rounded-lg luxury-shadow flex items-center gap-3">
          <Crown className="w-6 h-6 text-white" />
          <span className="text-xl font-bold text-white">Platinum Member</span>
        </div>
      </div>
    </div>
  );
}
