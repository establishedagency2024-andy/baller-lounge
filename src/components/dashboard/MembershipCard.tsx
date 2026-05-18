import { useState } from "react";
import bbLogo from "@/assets/bb-logo.png";

interface MembershipCardProps {
  memberName: string;
  memberDate: string;
}

export function MembershipCard({ memberName, memberDate }: MembershipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // SVG chevron pattern for embossed metallic texture
  const chevronPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='12' viewBox='0 0 40 12'%3E%3Cpath d='M0 6 L10 0 L20 6 L30 0 L40 6 L30 12 L20 6 L10 12 Z' fill='none' stroke='%23bfc4cb' stroke-width='0.6' opacity='0.55'/%3E%3C/svg%3E")`;

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
      {/* Front of Card */}
      <div
        className="group relative w-[470px] h-[290px] rounded-[22px] overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-[1.03]"
        style={{
          background:
            "linear-gradient(135deg, #f5f6f8 0%, #e6e8ec 45%, #d5d8de 100%)",
          boxShadow:
            "0 30px 60px -20px rgba(0,0,0,0.55), 0 10px 25px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.08)",
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Embossed chevron pattern */}
        <div
          className="absolute inset-0 opacity-70"
          style={{ backgroundImage: chevronPattern, backgroundSize: "40px 12px" }}
        />
        {/* Diagonal sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent opacity-50 mix-blend-overlay" />
        {/* Soft inner vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.12)_100%)]" />

        {/* Content */}
        <div className="relative z-10 h-full p-7 flex flex-col justify-between">
          {/* Top row */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[15px] font-semibold tracking-wide text-neutral-700 uppercase leading-tight">
                {memberName}
              </h2>
              <p className="text-[13px] text-neutral-500 mt-0.5">Member</p>
            </div>
            <div className="text-right">
              <span className="text-[15px] font-bold tracking-[0.18em] text-neutral-700 uppercase">
                Billion Ballers
              </span>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-600/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-semibold tracking-[0.15em] text-emerald-700 uppercase">Active</span>
              </div>
            </div>
          </div>

          {/* Centered embossed logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src={bbLogo}
              alt="Billion Ballers"
              className="w-28 h-28 object-contain opacity-90"
              style={{
                filter:
                  "drop-shadow(0 1px 0 rgba(255,255,255,0.9)) drop-shadow(0 2px 4px rgba(0,0,0,0.25)) grayscale(1) brightness(1.05)",
              }}
            />
          </div>

          {/* Bottom row */}
          <div className="flex justify-between items-end">
            <span className="text-[13px] font-medium tracking-wider text-neutral-500 uppercase">
              Since {memberDate}
            </span>
          </div>
        </div>
      </div>

      {/* Back of Card */}
      <div
        className="relative w-[470px] h-[290px] rounded-[22px] overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-[1.03]"
        style={{
          background:
            "linear-gradient(135deg, #f5f6f8 0%, #e6e8ec 45%, #d5d8de 100%)",
          boxShadow:
            "0 30px 60px -20px rgba(0,0,0,0.55), 0 10px 25px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.08)",
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{ backgroundImage: chevronPattern, backgroundSize: "40px 12px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent opacity-50 mix-blend-overlay" />

        {/* Magnetic stripe */}
        <div className="absolute top-8 left-0 w-full h-12 bg-neutral-800/90" />

        {/* Signature strip */}
        <div className="absolute bottom-10 left-6 right-6 h-10 bg-white/90 rounded-sm flex items-center px-3">
          <span className="text-xs text-neutral-400 italic">Authorized Signature</span>
        </div>

        <div className="absolute bottom-2 right-6 text-[10px] tracking-widest text-neutral-500 uppercase">
          Billion Ballers · Exclusive Membership
        </div>
      </div>
    </div>
  );
}
