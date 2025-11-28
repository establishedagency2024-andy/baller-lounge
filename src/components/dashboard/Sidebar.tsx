import { LayoutDashboard, CreditCard, Trophy, Gift, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Membership Card", url: "/membership", icon: CreditCard },
  { title: "Giveaways & Entries", url: "/giveaways", icon: Trophy },
  { title: "Loyalty & Rewards", url: "/discounts", icon: Gift },
  { title: "Subscription", url: "/subscription", icon: Settings },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border luxury-shadow transition-all duration-300 z-20",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="p-6">
          {!isCollapsed && (
            <h1 className="text-2xl font-bold text-foreground">
              Billion Ballers
            </h1>
          )}
          {isCollapsed && (
            <h1 className="text-2xl font-bold text-foreground text-center">
              BB
            </h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/"}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg smooth-transition hover:bg-sidebar-accent text-sidebar-foreground",
                isCollapsed && "justify-center px-2"
              )}
              activeClassName="bg-sidebar-accent text-primary font-medium"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
