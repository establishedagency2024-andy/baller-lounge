import { useState } from "react";
import bbLogo from "@/assets/bb-logo.png";

interface MembershipCardProps {
  memberName: string;
  memberDate: string;
}

export function MembershipCard({ memberName, memberDate }: MembershipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

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
            <div>
              <img src={bbLogo} alt="BB Logo" className="w-16 h-16 object-contain" />
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="flex justify-between items-end">
            <span className="text-xl font-bold text-white/90">{memberDate}</span>
          </div>
        </div>
      </div>

      {/* Back of Card */}
      <div 
        className="relative w-[380px] h-[240px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 luxury-shadow bg-[#1a1a1a]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Large BB Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={bbLogo} alt="BB Logo" className="w-32 h-32 object-contain" />
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
