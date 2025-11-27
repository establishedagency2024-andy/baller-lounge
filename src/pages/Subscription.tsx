import { CurrentGiveaway } from "@/components/dashboard/CurrentGiveaway";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Check, Calendar, CreditCard } from "lucide-react";

const Subscription = () => {
  return (
    <div className="space-y-8 animate-fade-up">
      {/* Current Giveaway - Sticky */}
      <div className="sticky top-0 z-10 pb-4 bg-background/95 backdrop-blur-sm">
        <CurrentGiveaway />
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Subscription
        </h1>

        {/* Main Subscription Card */}
        <Card className="bg-gradient-to-br from-gray-300 via-gray-600 to-black border-0 luxury-shadow max-w-3xl">
          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Platinum Member</h2>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-gray-900">$29</p>
                <p className="text-sm text-gray-600">fortnightly</p>
              </div>
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

        {/* Billing Information */}
        <Card className="luxury-gradient-card luxury-shadow border-border/50 max-w-3xl">
          <div className="p-8 space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Billing Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Next billing date</p>
                    <p className="text-sm text-muted-foreground">Your next payment</p>
                  </div>
                </div>
                <p className="font-semibold text-foreground">November 30, 2025</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Plan</p>
                    <p className="text-sm text-muted-foreground">Current subscription tier</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">Basic</p>
                  <Button variant="link" className="h-auto p-0 text-primary">
                    Change
                  </Button>
                </div>
              </div>
            </div>

            <Button variant="destructive" className="w-full">
              Cancel Subscription
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

function Star({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default Subscription;
