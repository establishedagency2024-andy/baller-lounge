import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

interface DiscountCardProps {
  brand: string;
  offer: string;
  discount: string;
  logoUrl?: string;
}

export function DiscountCard({ brand, offer, discount, logoUrl }: DiscountCardProps) {
  return (
    <Card className="luxury-gradient-card luxury-shadow border-border/50 p-6 smooth-transition hover:scale-105 animate-fade-up">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-5 h-5 text-primary" />
            <span className="text-2xl font-bold text-primary">{discount}</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{brand}</h3>
          <p className="text-sm text-muted-foreground">{offer}</p>
        </div>
        {logoUrl && (
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center">
            <img src={logoUrl} alt={brand} className="w-full h-full object-contain" />
          </div>
        )}
      </div>
      <Button variant="outline" className="w-full mt-4">
        View Offer
      </Button>
    </Card>
  );
}
