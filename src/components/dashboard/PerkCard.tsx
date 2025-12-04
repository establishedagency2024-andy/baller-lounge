import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PerkCardProps {
  title: string;
  features: string[];
  variant?: "navy" | "orange" | "cyan" | "image";
  className?: string;
  backgroundImage?: string;
}

const variantStyles = {
  navy: "bg-gradient-to-br from-[#1a2332] to-[#2a3647]",
  orange: "bg-gradient-to-br from-orange-600 to-orange-500",
  cyan: "bg-gradient-to-br from-cyan-600 to-cyan-500",
  image: "",
};

export function PerkCard({ title, features, variant = "navy", className, backgroundImage }: PerkCardProps) {
  return (
    <Card
      className={cn(
        "luxury-shadow border-0 p-6 smooth-transition hover:scale-105 animate-fade-up relative overflow-hidden",
        variant !== "image" && variantStyles[variant],
        className
      )}
    >
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
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-white/90 text-sm">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
