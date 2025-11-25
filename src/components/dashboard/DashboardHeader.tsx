import platinumBadge from "@/assets/platinum-member-badge.png";

export function DashboardHeader() {
  return (
    <div className="w-full bg-card border-b border-border mb-8 luxury-shadow">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold luxury-gradient-blue bg-clip-text text-transparent">
            Billion Ballers
          </h1>
        </div>

        {/* Platinum Member Badge */}
        <div className="flex items-center">
          <img 
            src={platinumBadge} 
            alt="Platinum Member" 
            className="h-12 w-auto"
          />
        </div>
      </div>
    </div>
  );
}
