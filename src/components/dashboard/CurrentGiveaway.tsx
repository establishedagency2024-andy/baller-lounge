import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import rolexImage from "@/assets/rolex-giveaway.jpg";

interface CurrentGiveawayProps {
  prizeImage?: string;
  brandName?: string;
  model?: string;
  modelReference?: string;
  liveDrawDate?: string;
  marketValue?: string;
  endDate?: Date;
  drawDescription?: string;
}

export function CurrentGiveaway({
  prizeImage = rolexImage,
  brandName = "ROLEX",
  model = "DATEJUST 41MM",
  modelReference = "126300-0019",
  liveDrawDate = "FEBRUARY 15, 2026",
  marketValue = "$16,500 AUD",
  endDate = new Date(2026, 1, 15),
  drawDescription = "The draw will take place 15th February 2026 or 24 hours after all 500 memberships are sold, but the draw will go ahead either way regardless of numbers, which ever comes first.",
}: CurrentGiveawayProps) {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setDays(String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"));
        setHours(String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"));
        setMinutes(String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"));
        setSeconds(String(Math.floor((difference / 1000) % 60)).padStart(2, "0"));
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  const specs = [
    { label: "BRAND NAME", value: brandName },
    { label: "MODEL", value: model },
    { label: "MODEL REFERENCE", value: modelReference },
    { label: "LIVE DRAW", value: liveDrawDate },
    { label: "MARKET VALUE", value: marketValue },
  ];

  const countdownItems = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <Card className="relative overflow-hidden border-0 animate-fade-up">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16162a] to-[#0d0d1a]" />

      <div className="relative flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative md:w-1/2 min-h-[300px] md:min-h-[420px]">
          <img
            src={prizeImage}
            alt={`${brandName} ${model}`}
            className="w-full h-full object-cover absolute inset-0"
          />
          {/* Nav arrows */}
          <button className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-6 md:p-8 space-y-5">
          {/* Specs */}
          <div className="space-y-3">
            {specs.map((spec) => (
              <div key={spec.label}>
                <span className="text-white/60 text-sm tracking-wider">{spec.label} – </span>
                <span className="text-white font-bold text-sm">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Countdown */}
          <div className="flex gap-4">
            {countdownItems.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white font-mono">{item.value}</p>
                <p className="text-xs text-white/50 mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed">{drawDescription}</p>

          {/* CTA */}
          <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wider rounded-md flex items-center gap-3 transition-colors">
            ENTER NOW <ArrowRight className="w-4 h-4" />
          </button>

          {/* T&Cs */}
          <a href="#" className="text-white/60 text-sm underline hover:text-white/80 transition-colors inline-block">
            View promotion T&Cs
          </a>
        </div>
      </div>
    </Card>
  );
}
