import { Crown } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

export function DashboardHeader() {
  const [daysCount, setDaysCount] = useState(0);

  useEffect(() => {
    const target = 256;
    const steps = 60;
    const increment = target / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDaysCount(target);
        clearInterval(timer);
      } else {
        setDaysCount(Math.floor(increment * currentStep));
      }
    }, 2000 / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="relative overflow-hidden border-border/50 animate-fade-up mb-6">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700 animate-gradient-shift" />
      <div className="absolute inset-0 bg-gradient-to-tl from-yellow-300/30 via-transparent to-amber-300/20 animate-gradient-pulse" />
      
      <div className="relative px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Gold Member - Left */}
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-white" />
            <span className="text-xl font-bold text-white">Gold Member</span>
          </div>
          
          {/* Days Counter - Right */}
          <div className="text-right">
            <p className="text-3xl font-bold text-white">{daysCount}</p>
            <p className="text-sm text-white/80 uppercase tracking-wider">days a member</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
