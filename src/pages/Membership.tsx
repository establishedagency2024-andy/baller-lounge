import { CurrentGiveaway } from "@/components/dashboard/CurrentGiveaway";
import { MembershipCard } from "@/components/dashboard/MembershipCard";

const Membership = () => {
  return (
    <div className="space-y-8 animate-fade-up">
      {/* Current Giveaway - Sticky */}
      <div className="sticky top-0 z-10 pb-4 bg-background/95 backdrop-blur-sm">
        <CurrentGiveaway />
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center">
          Your Membership Card
        </h1>

        <MembershipCard 
          memberName="Andrew De Angelis"
          memberDate="10/24"
        />

        <p className="text-center text-sm text-muted-foreground mt-8">
          Show this card at partner locations for exclusive discounts
        </p>
      </div>
    </div>
  );
};

export default Membership;
