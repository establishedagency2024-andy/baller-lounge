import { CurrentGiveaway } from "@/components/dashboard/CurrentGiveaway";
import { MembershipChip } from "@/components/dashboard/MembershipChip";
import { PerkCard } from "@/components/dashboard/PerkCard";
import { Card } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import businessClassImage from "@/assets/business-class-cabin.jpg";

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-up">
      {/* Current Giveaway - Sticky */}
      <div className="sticky top-0 z-10 pb-4 bg-background/95 backdrop-blur-sm">
        <CurrentGiveaway />
      </div>

      {/* Greeting Section */}
      <div className="space-y-2 animate-slide-in">
        <MembershipChip tier="platinum" />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4">
          Good Morning, Andy.
        </h1>
        <p className="text-lg text-muted-foreground">
          Welcome to your personal Billion Ballers Dashboard
        </p>
      </div>

      {/* Membership Perks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Your Membership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PerkCard
            title="Platinum Member"
            variant="platinum"
            features={[
              "1 Free entry on sign up into every hype/watch giveaway",
              "+1 Free accumulating entry added every month",
              "Exclusive access to discounts with partners",
            ]}
          />
          <PerkCard
            title="Business Class Seat Discounts"
            variant="image"
            backgroundImage={businessClassImage}
            features={[
              "Exclusive discounts on premium flights",
              "Priority booking access",
              "Complimentary upgrades when available",
            ]}
          />
        </div>
      </section>

      {/* Subscription Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Subscription</h2>
        <Card className="relative overflow-hidden border-0 luxury-shadow">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4a4a4a] via-[#3a3a3a] to-[#1a1a1a] animate-gradient-shift" />
          <div className="absolute inset-0 bg-gradient-to-tl from-[#5a5a5a]/20 via-transparent to-[#4a4a4a]/15 animate-gradient-pulse" />
          
          <div className="relative p-8 space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-white">Platinum Member</h2>
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2">
              <div className="px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium flex items-center gap-2">
                <Star className="w-4 h-4" />
                Level 1
              </div>
              <div className="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium">
                Active and up to date
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3 py-4">
              {[
                "1 entries into every draw (accumulating by +1 entry 2 weeks)",
                "1 connect credits send to our app (1 connect credits every 2 weeks)",
                "6x multiplier on all future one-time purchases, all draw long",
                "You can pause your membership in 2 days for up to 3 months.",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 text-white">
                  <Check className="w-5 h-5 mt-0.5 text-emerald-400 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
