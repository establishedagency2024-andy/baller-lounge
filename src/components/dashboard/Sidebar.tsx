import { LayoutDashboard, CreditCard, Trophy, Gift, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Membership Card", url: "/membership", icon: CreditCard },
  { title: "Giveaways & Entries", url: "/giveaways", icon: Trophy },
  { title: "Loyalty & Rewards", url: "/discounts", icon: Gift },
  { title: "Subscription", url: "/subscription", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border luxury-shadow">
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold luxury-gradient-blue bg-clip-text text-transparent">
            Billion Ballers
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/"}
              className="flex items-center gap-3 px-4 py-3 rounded-lg smooth-transition hover:bg-sidebar-accent text-sidebar-foreground"
              activeClassName="bg-sidebar-accent text-primary font-medium"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
