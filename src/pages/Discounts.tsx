
import { DiscountCard } from "@/components/dashboard/DiscountCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Discounts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", "Beauty", "Cars", "Fashion", "Fitness", "Flight", "Hospitality"];
  
  const discounts = [
    { 
      category: "Flight", 
      title: "Up to 50% Off Flights",
      imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
      partnerName: "SkyLux Aviation",
      partnerDescription: "SkyLux Aviation partners with the world's top airlines to bring Billion Ballers members unbeatable deals on flights worldwide. Save up to 50% off across economy, business, and first class fares.",
      discountDetails: "Up to 50% Off Flights",
    },
    { 
      category: "Hospitality", 
      title: "Platinum Members 60% Off at hotels worldwide from premium hotel groups",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      partnerName: "Grand Luxe Hotels",
      partnerDescription: "Grand Luxe Hotels is a curated collection of five-star properties across 40+ countries. As a Platinum member, enjoy preferential rates and complimentary upgrades at participating resorts and city hotels.",
      discountDetails: "Up to 60% Off Premium Hotel Stays Worldwide",
    },
    { 
      category: "Cars", 
      title: "Platinum Members 40% Off luxury vehicle rentals and experiences",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      partnerName: "Prestige Drive",
      partnerDescription: "Prestige Drive offers an elite fleet of luxury and supercar rentals. From Lamborghinis to Rolls-Royces, experience the thrill of driving the world's finest vehicles at exclusive member rates.",
      discountDetails: "40% Off Luxury & Supercar Rentals",
    },
    { 
      category: "Fashion", 
      title: "Platinum Members 50% Off designer fashion collections",
      imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      partnerName: "Atelier Privé",
      partnerDescription: "Atelier Privé is a members-only fashion house offering exclusive access to designer collections, private showroom appointments, and bespoke tailoring services for the discerning gentleman and lady.",
      discountDetails: "50% Off Designer Fashion Collections",
    },
    { 
      category: "Beauty", 
      title: "Platinum Members 35% Off premium beauty and skincare products",
      imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
      partnerName: "Lumière Beauty",
      partnerDescription: "Lumière Beauty is a premium skincare and cosmetics brand known for its use of rare, scientifically-backed ingredients. Platinum members enjoy exclusive discounts on their full product range and spa treatments.",
      discountDetails: "35% Off Premium Beauty & Skincare",
    },
    { 
      category: "Fitness", 
      title: "Platinum Members 45% Off elite gym memberships and wellness programs",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      partnerName: "Apex Fitness Club",
      partnerDescription: "Apex Fitness Club operates boutique luxury gyms with personal training, recovery suites, and wellness programming. Platinum members receive priority access and significant savings on annual memberships.",
      discountDetails: "45% Off Elite Gym & Wellness Memberships",
    },
  ];

  const filteredDiscounts = activeCategory === "All" 
    ? discounts 
    : discounts.filter(d => d.category === activeCategory);

  return (
    <div className="space-y-8 animate-fade-up pb-12">
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
