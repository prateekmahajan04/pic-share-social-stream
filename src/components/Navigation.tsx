import { Heart, Home, Plus, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "create", icon: Plus, label: "Create" },
    { id: "activity", icon: Heart, label: "Activity" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:top-0 md:bottom-auto md:left-0 md:w-16 lg:w-64 md:h-screen md:border-t-0 md:border-r z-50">
      <div className="flex justify-around items-center h-16 md:flex-col md:h-full md:py-8 md:justify-start md:gap-8">
        {/* Logo - hidden on mobile, shown on desktop */}
        <div className="hidden md:block lg:px-6 mb-8">
          <h1 className="text-2xl font-bold bg-gradient-instagram bg-clip-text text-transparent lg:block hidden">
            Instaclone
          </h1>
          <div className="w-8 h-8 bg-gradient-instagram rounded-lg lg:hidden"></div>
        </div>

        {/* Navigation Items */}
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange(item.id)}
            className={`flex items-center gap-3 h-12 md:w-full lg:justify-start md:justify-center ${
              activeTab === item.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="hidden lg:block">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};