import platinumBadge from "@/assets/platinum-member-badge.png";

export function DashboardHeader() {
  return (
    <div className="w-full bg-background mb-8">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-end">
        {/* Platinum Member Badge */}
        <div className="flex items-center">
          <img 
            src={platinumBadge} 
            alt="Platinum Member" 
            className="h-16 w-auto"
          />
        </div>
      </div>
    </div>
  );
}
