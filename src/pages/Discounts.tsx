import { CurrentGiveaway } from "@/components/dashboard/CurrentGiveaway";
import { DiscountCard } from "@/components/dashboard/DiscountCard";

const Discounts = () => {
  const discounts = [
    { brand: "Premium Watches", offer: "Luxury timepieces for members", discount: "20% OFF" },
    { brand: "Designer Fashion", offer: "Exclusive fashion collections", discount: "15% OFF" },
    { brand: "Fine Jewelry", offer: "Curated jewelry pieces", discount: "25% OFF" },
    { brand: "Luxury Cars", offer: "Premium vehicle experiences", discount: "10% OFF" },
    { brand: "Fine Dining", offer: "Michelin-starred restaurants", discount: "30% OFF" },
    { brand: "Travel & Hotels", offer: "5-star accommodations", discount: "20% OFF" },
    { brand: "Tech & Gadgets", offer: "Latest premium electronics", discount: "15% OFF" },
    { brand: "Fitness & Wellness", offer: "Elite gym memberships", discount: "25% OFF" },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Current Giveaway - Sticky */}
      <div className="sticky top-0 z-10 pb-4 bg-background/95 backdrop-blur-sm">
        <CurrentGiveaway />
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Exclusive Member Discounts
          </h1>
          <p className="text-lg text-muted-foreground">
            Premium offers curated exclusively for Billion Ballers members
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discounts.map((discount, index) => (
            <DiscountCard key={index} {...discount} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discounts;
