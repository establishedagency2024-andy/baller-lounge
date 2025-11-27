import { CurrentGiveaway } from "@/components/dashboard/CurrentGiveaway";
import { DiscountCard } from "@/components/dashboard/DiscountCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Discounts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", "Beauty", "Cars", "Fashion", "Fitness", "Flight", "Hospitality"];
  
  const discounts = [
    { 
      category: "Flight", 
      title: "Platinum Members 30 - 70% Off Business and First Class Tickets",
      imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
    },
    { 
      category: "Hospitality", 
      title: "Platinum Members 60% Off at hotels worldwide from premium hotel groups",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
    },
    { 
      category: "Cars", 
      title: "Platinum Members 40% Off luxury vehicle rentals and experiences",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    { 
      category: "Fashion", 
      title: "Platinum Members 50% Off designer fashion collections",
      imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
    },
    { 
      category: "Beauty", 
      title: "Platinum Members 35% Off premium beauty and skincare products",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80"
    },
    { 
      category: "Fitness", 
      title: "Platinum Members 45% Off elite gym memberships and wellness programs",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
    },
  ];

  const filteredDiscounts = activeCategory === "All" 
    ? discounts 
    : discounts.filter(d => d.category === activeCategory);

  return (
    <div className="space-y-8 animate-fade-up pb-12">
      {/* Current Giveaway - Sticky */}
      <div className="sticky top-0 z-10 pb-4 bg-background/95 backdrop-blur-sm">
        <CurrentGiveaway />
      </div>

      <div className="space-y-8">
        {/* Header - Centered */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Brand Partner Discounts
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover exclusive discounts offered by our global luxury brand partners.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-3 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "secondary"}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 ${
                activeCategory === category 
                  ? "bg-foreground text-background hover:bg-foreground/90" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Discount Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDiscounts.map((discount, index) => (
            <DiscountCard key={index} {...discount} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discounts;
