import { CurrentGiveaway } from "@/components/dashboard/CurrentGiveaway";
import { MembershipChip } from "@/components/dashboard/MembershipChip";
import { LevelProgress } from "@/components/dashboard/LevelProgress";
import { PerkCard } from "@/components/dashboard/PerkCard";
import { DiscountCard } from "@/components/dashboard/DiscountCard";
import { WinnerCard } from "@/components/dashboard/WinnerCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

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

      {/* Level Progress */}
      <LevelProgress
        currentLevel={1}
        nextLevel={2}
        daysUntilUnlock={11}
        memberDays={256}
        progress={50}
      />

      {/* Membership Perks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Your Membership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PerkCard
            title="Grail Plus Basic"
            variant="navy"
            features={[
              "1 entry into every draw long (accumulating +1 entry 2 weeks)",
              "1 connect credits send to our app (1 connect credits every 2 weeks)",
              "6x multiplier on all future one-time purchases, all draw long",
              "You can pause your membership in 2 days for up to 3 months.",
            ]}
          />
          <PerkCard
            title="1 per draw"
            variant="orange"
            features={[
              "Accumulating +1 every 2 weeks",
              "Early bird access to new releases",
              "Exclusive member-only prizes",
            ]}
          />
          <PerkCard
            title="Enjoy access to early bird"
            variant="cyan"
            features={[
              "All draw long",
              "First look at upcoming giveaways",
              "Premium support",
              "VIP community access",
            ]}
          />
        </div>
      </section>

      {/* Discounts Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Exclusive Discounts</h2>
          <Button variant="outline">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DiscountCard
            category="Fashion"
            title="Platinum Members 50% Off designer fashion collections"
            imageUrl="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
          />
          <DiscountCard
            category="Hospitality"
            title="Platinum Members 60% Off at hotels worldwide from premium hotel groups"
            imageUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
          />
          <DiscountCard
            category="Flight"
            title="Platinum Members 30 - 70% Off Business and First Class Tickets"
            imageUrl="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
          />
        </div>
      </section>

      {/* Past Winners */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Recent Winners</h2>
          <Button variant="outline">View All Winners</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <WinnerCard
            winnerName="Member #4523"
            prize="Rolex Submariner"
            date="November 15, 2025"
          />
          <WinnerCard
            winnerName="Member #2891"
            prize="Patek Philippe Nautilus"
            date="November 8, 2025"
          />
          <WinnerCard
            winnerName="Member #6742"
            prize="Audemars Piguet Royal Oak"
            date="November 1, 2025"
          />
          <WinnerCard
            winnerName="Member #1205"
            prize="Omega Speedmaster"
            date="October 25, 2025"
          />
        </div>
      </section>

      {/* Subscription Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Subscription</h2>
        <Card className="bg-gradient-to-br from-gray-400 via-gray-700 to-black border-0 luxury-shadow max-w-3xl">
          <div className="p-8 space-y-6">
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
