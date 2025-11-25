import { Timer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import rolexImage from "@/assets/rolex-giveaway.jpg";

interface CurrentGiveawayProps {
  prizeTitle?: string;
  prizeImage?: string;
  userEntries?: number;
  totalEntries?: number;
  endDate?: Date;
}

export function CurrentGiveaway({
  prizeTitle = "Win a Rolex Datejust 41 Blue Dial",
  prizeImage = rolexImage,
  userEntries = 137,
  totalEntries = 915,
  endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
}: CurrentGiveawayProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Draw ended");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <Card className="relative overflow-hidden luxury-gradient-card luxury-shadow border-border/50 animate-fade-up">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative p-6 flex flex-col md:flex-row gap-6 items-center">
        {/* Prize Image */}
        <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden luxury-shadow glow-gold flex-shrink-0">
          <img 
            src={prizeImage} 
            alt={prizeTitle}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              Current Giveaway - Relax, You're In The Draw Already
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {prizeTitle}
            </h2>
            <p className="text-primary font-semibold">
              {userEntries.toLocaleString()} ENTRIES
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Countdown */}
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg">
              <Timer className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Draw ends in</p>
                <p className="font-mono font-semibold text-foreground">{timeLeft}</p>
              </div>
            </div>

            {/* Entry Info */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Relax — you're already locked into this draw.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
