import { Badge } from "@/components/ui/badge";

interface DiscountCardProps {
  category: string;
  title: string;
  imageUrl: string;
}

export function DiscountCard({ category, title, imageUrl }: DiscountCardProps) {
  return (
    <div className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer smooth-transition hover:scale-[1.02] animate-fade-up">
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
        {/* Category Badge */}
        <Badge className="w-fit mb-4 bg-primary text-primary-foreground rounded-full px-4 py-1">
          {category}
        </Badge>
        
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
}
