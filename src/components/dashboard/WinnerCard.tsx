import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface WinnerCardProps {
  winnerName: string;
  prize: string;
  date: string;
  prizeImage?: string;
}

export function WinnerCard({ winnerName, prize, date, prizeImage }: WinnerCardProps) {
  return (
    <Card className="luxury-gradient-card luxury-shadow border-border/50 overflow-hidden smooth-transition hover:scale-105 animate-fade-up">
      {prizeImage && (
        <div className="w-full h-40 overflow-hidden bg-muted/20">
          <img src={prizeImage} alt={prize} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary" />
          <h4 className="font-semibold text-foreground">{prize}</h4>
        </div>
        <p className="text-sm text-muted-foreground">{winnerName}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </Card>
  );
}
