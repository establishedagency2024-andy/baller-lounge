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
    <Card className="relative overflow-hidden border border-white/10 animate-fade-up mb-6 rounded-2xl backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
      {/* Glass gradient background - deep navy to midnight */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a4a] via-[#16213e] to-[#0a0f24] animate-gradient-shift" />
      {/* Subtle blue glow accent */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[hsl(217,91%,55%)]/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-[hsl(220,80%,40%)]/15 blur-3xl" />
      {/* Glass sheen highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
      {/* Noise/grain for depth */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}} />

      <div className="relative px-8 py-6">
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
    </Card>
  );
}
