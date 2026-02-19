import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface DiscountCardProps {
  category: string;
  title: string;
  imageUrl: string;
  partnerName?: string;
  partnerDescription?: string;
  discountDetails?: string;
}

export function DiscountCard({ 
  category, 
  title, 
  imageUrl, 
  partnerName,
  partnerDescription,
  discountDetails,
}: DiscountCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setOpen(true)}
        className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer smooth-transition hover:scale-[1.02] animate-fade-up"
      >
        {/* Background Image */}
        <img 
          src={imageUrl} 
          alt={category}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <Badge className="w-fit mb-4 bg-primary text-primary-foreground rounded-full px-4 py-1">
            {category}
          </Badge>
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {title}
          </h3>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-0">
          <DialogTitle className="sr-only">{partnerName || category} Partner Details</DialogTitle>
          {/* Hero Image */}
          <div className="relative h-64">
            <img
              src={imageUrl}
              alt={partnerName || category}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <Badge className="mb-2 bg-primary text-primary-foreground rounded-full px-4 py-1">
                {category}
              </Badge>
              <h2 className="text-2xl font-bold text-white">{partnerName || category + " Partner"}</h2>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-5">
            {/* Discount Highlight */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Your Platinum Discount</p>
              <p className="text-xl font-bold text-foreground">{discountDetails || title}</p>
            </div>

            {/* Partner Info */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">About the Partner</h3>
              <p className="text-muted-foreground leading-relaxed">
                {partnerDescription || `As a valued Platinum member, you have exclusive access to premium ${category.toLowerCase()} discounts through our partnership. Present your membership card or use your unique discount code at checkout to redeem this offer.`}
              </p>
            </div>

            {/* How to Redeem */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">How to Redeem</h3>
              <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Show your Billion Ballers Platinum membership card</li>
                <li>Mention the Billion Ballers partnership at booking or checkout</li>
                <li>Enjoy your exclusive member discount</li>
              </ol>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
