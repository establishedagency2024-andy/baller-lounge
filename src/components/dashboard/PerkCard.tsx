import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PerkCardProps {
  title: string;
  features?: string[];
  description?: string;
  variant?: "navy" | "orange" | "cyan" | "image" | "platinum";
  className?: string;
  backgroundImage?: string;
}

const variantStyles = {
  navy: "bg-gradient-to-br from-[#1a2332] to-[#2a3647]",
  orange: "bg-gradient-to-br from-orange-600 to-orange-500",
  cyan: "bg-gradient-to-br from-cyan-600 to-cyan-500",
  image: "",
  platinum: "",
};

export function PerkCard({ title, features, description, variant = "navy", className, backgroundImage }: PerkCardProps) {
  return (
    <Card
      className={cn(
        "luxury-shadow border-0 p-6 smooth-transition hover:scale-105 animate-fade-up relative overflow-hidden",
        variant !== "image" && variant !== "platinum" && variantStyles[variant],
        className
      )}
    >
      {variant === "platinum" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a4a] via-[#16213e] to-[#0a0f24] animate-gradient-shift" />
          <div className="absolute inset-0 bg-gradient-to-tl from-[#2a3a5e]/30 via-transparent to-[#1e2a4a]/20 animate-gradient-pulse" />
        </>
      )}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        {description ? (
          <p className="text-white/90 text-sm leading-relaxed">{description}</p>
        ) : features ? (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-white/90 text-sm">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Card>
  );
}
