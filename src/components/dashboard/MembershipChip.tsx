import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MembershipChipProps {
  tier: "silver" | "gold" | "platinum";
  className?: string;
}

const tierConfig = {
  silver: {
    label: "Silver Member",
    bgClass: "bg-gradient-to-r from-gray-400 to-gray-300",
    textClass: "text-gray-900",
  },
  gold: {
    label: "Gold Member",
    bgClass: "luxury-gradient-blue",
    textClass: "text-primary-foreground",
  },
  platinum: {
    label: "Platinum Member",
    bgClass: "luxury-gradient-platinum",
    textClass: "text-primary-foreground",
  },
};

export function MembershipChip({ tier, className }: MembershipChipProps) {
  const config = tierConfig[tier];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold smooth-transition hover:scale-105",
        config.bgClass,
        config.textClass,
        className
      )}
    >
      <Crown className="w-5 h-5" />
      <span>{config.label}</span>
    </div>
  );
}
