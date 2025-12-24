import { Home, Library, Settings } from "lucide-react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/library", icon: Library, label: "Library" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border pb-safe">
      <div className="max-w-2xl mx-auto flex items-center justify-around h-16">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
          
          return (
            <RouterNavLink
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-xl transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  isActive && "bg-primary/10"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">{label}</span>
            </RouterNavLink>
          );
        })}
      </div>
    </nav>
  );
}
