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
  const [animatedEntries, setAnimatedEntries] = useState(0);
  const [showRelaxText, setShowRelaxText] = useState(false);

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

  useEffect(() => {
    // Animate entries counter
    const steps = 60;
    const increment = userEntries / steps;
    let currentStep = 0;

    const entriesTimer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setAnimatedEntries(userEntries);
        clearInterval(entriesTimer);
      } else {
        setAnimatedEntries(Math.floor(increment * currentStep));
      }
    }, 2000 / steps);

    // Reveal relax text after 1 second
    const textTimer = setTimeout(() => {
      setShowRelaxText(true);
    }, 1000);

    return () => {
      clearInterval(entriesTimer);
      clearTimeout(textTimer);
    };
  }, [userEntries]);

  return (
    <Card className="relative overflow-hidden bg-black border-border/50 animate-fade-up">
      {/* Animated Entries - Top Right */}
      <div className="absolute top-6 right-6 text-right">
        <p className="text-5xl font-bold text-white mb-1">
          {animatedEntries.toLocaleString()}
        </p>
        <p className="text-sm text-white/80 uppercase tracking-wider">ENTRIES</p>
      </div>

      <div className="relative p-6 flex flex-col md:flex-row gap-6 items-center">
        {/* Prize Image */}
        <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden luxury-shadow glow-blue flex-shrink-0">
          <img 
            src={prizeImage} 
            alt={prizeTitle}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <p className="text-sm text-white/70 uppercase tracking-wider mb-2">
              Current Giveaway
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {prizeTitle}
            </h2>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg w-fit mx-auto md:mx-0">
            <Timer className="w-5 h-5 text-white" />
            <div>
              <p className="text-xs text-white/70">Draw ends in</p>
              <p className="font-mono font-semibold text-white">{timeLeft}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Relax Text - Bottom with Timer Reveal */}
      <div className={`px-6 pb-6 transition-all duration-700 ${showRelaxText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-2xl md:text-3xl font-semibold text-white text-center">
          Relax — you're already locked into this draw.
        </p>
      </div>
    </Card>
  );
}
