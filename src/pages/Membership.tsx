import { CurrentGiveaway } from "@/components/dashboard/CurrentGiveaway";
import { MembershipChip } from "@/components/dashboard/MembershipChip";
import { Card } from "@/components/ui/card";
import { QrCode } from "lucide-react";

const Membership = () => {
  return (
    <div className="space-y-8 animate-fade-up">
      {/* Current Giveaway - Sticky */}
      <div className="sticky top-0 z-10 pb-4 bg-background/95 backdrop-blur-sm">
        <CurrentGiveaway />
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Your Membership Card
        </h1>

        <Card className="luxury-gradient-card luxury-shadow border-border/50 p-8 max-w-2xl mx-auto">
          <div className="space-y-6">
            {/* Member Tier */}
            <div className="flex justify-center">
              <MembershipChip tier="platinum" />
            </div>

            {/* Member Details */}
            <div className="space-y-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Member Name</p>
                <p className="text-2xl font-bold text-foreground">Andy</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Member ID</p>
                <p className="text-xl font-mono text-foreground">BB-2025-4782</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="text-lg text-foreground">November 23, 2025</p>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center pt-6">
              <div className="p-8 bg-white rounded-xl">
                <QrCode className="w-32 h-32 text-gray-900" />
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Scan this code at partner locations for exclusive discounts
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Membership;
