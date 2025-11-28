import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface MembershipCardProps {
  memberName: string;
  memberNumber: number;
  memberDate: string;
}

export function MembershipCard({ memberName, memberNumber, memberDate }: MembershipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [animatedNumber, setAnimatedNumber] = useState(0);

  useEffect(() => {
    const target = memberNumber;
    const steps = 60;
    const increment = target / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setAnimatedNumber(target);
        clearInterval(timer);
      } else {
        setAnimatedNumber(Math.floor(increment * currentStep));
      }
    }, 2000 / steps);

    return () => clearInterval(timer);
  }, [memberNumber]);

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
      {/* Front of Card */}
      <div 
        className="relative w-[380px] h-[240px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 luxury-shadow"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Background with diagonal stripes */}
        <div className="absolute inset-0 bg-[#1a1a1a]">
          {/* Blue diagonal stripes */}
          <div className="absolute top-0 left-0 w-[55%] h-full bg-primary transform -skew-x-12 -translate-x-8" />
          <div className="absolute bottom-0 left-[15%] w-[40%] h-[55%] bg-primary transform -skew-x-12" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full p-6 flex flex-col justify-between">
          {/* Top section */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white leading-tight">
                {memberName.split(' ').map((name, i) => (
                  <span key={i} className="block">{name}</span>
                ))}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white/90 font-mono">
                {animatedNumber}
              </p>
              <p className="text-xs text-white/60 uppercase tracking-wider">entries</p>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="flex justify-between items-end">
            <span className="text-xl font-bold text-white/90">{memberDate}</span>
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-4xl font-black text-primary tracking-tight" style={{ fontFamily: 'system-ui' }}>
                BB
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Back of Card */}
      <div 
        className="relative w-[380px] h-[240px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 luxury-shadow bg-[#1a1a1a]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Large BB design */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Stylized BB text */}
          <div className="relative">
            <span 
              className="text-[140px] font-black text-primary leading-none tracking-tighter"
              style={{ 
                fontFamily: 'system-ui',
                WebkitTextStroke: '3px hsl(var(--primary))',
                color: 'transparent',
                paintOrder: 'stroke fill'
              }}
            >
              BB
            </span>
            {/* Inner stroke effect */}
            <span 
              className="absolute inset-0 text-[140px] font-black text-[#1a1a1a] leading-none tracking-tighter"
              style={{ 
                fontFamily: 'system-ui',
                WebkitTextStroke: '0px',
                transform: 'scale(0.85)',
                transformOrigin: 'center'
              }}
            >
              BB
            </span>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4">
          <Sparkles className="w-4 h-4 text-white/60" />
        </div>
        
        {/* Side text */}
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ml-32">
          <div className="transform -rotate-90 whitespace-nowrap">
            <span className="text-xs text-white/60 tracking-widest uppercase">Billion Ballers</span>
          </div>
        </div>

        {/* Bottom decorative stripe */}
        <div className="absolute bottom-0 left-0 w-full h-8">
          <div className="absolute bottom-4 left-8 w-12 h-6 bg-primary transform -skew-x-12" />
        </div>
      </div>
    </div>
  );
}
