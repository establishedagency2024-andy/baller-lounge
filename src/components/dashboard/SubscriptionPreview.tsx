import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface SubscriptionPreviewProps {
  tier: "Basic" | "Premium" | "Elite";
  price: string;
  billingCycle: string;
  status: string;
  benefits: string[];
}

export function SubscriptionPreview({
  tier,
  price,
  billingCycle,
  status,
  benefits,
}: SubscriptionPreviewProps) {
  return (
    <Card className="bg-gradient-to-br from-[#e8dcc4] to-[#d4c5a9] border-0 luxury-shadow animate-fade-up">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-amber-700" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{tier}</h3>
              <p className="text-sm text-gray-600">Your subscription renews not available</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">{price}</p>
            <p className="text-sm text-gray-600">{billingCycle}</p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1 bg-gray-900/80 text-white rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            Level 1
          </div>
          <div className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-medium">
            {status}
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-800 text-sm">
              <Check className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Action */}
        <Link to="/subscription">
          <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
            Manage Subscription
          </Button>
        </Link>
      </div>
    </Card>
  );
}

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
