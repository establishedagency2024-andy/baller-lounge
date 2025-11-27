import { Crown } from "lucide-react";
import { useState, useEffect } from "react";

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
    <div className="w-full bg-background mb-8">
      <div className="w-full bg-gradient-to-br from-gray-400 via-gray-700 to-black px-8 py-6 luxury-shadow">
        <div className="flex items-center justify-between">
          {/* Platinum Member - Left */}
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-white" />
            <span className="text-xl font-bold text-white">Platinum Member</span>
          </div>
          
          {/* Days Counter - Right */}
          <div className="text-right">
            <p className="text-3xl font-bold text-white">{daysCount}</p>
            <p className="text-sm text-white/80 uppercase tracking-wider">days a member</p>
          </div>
        </div>
      </div>
    </div>
  );
}
