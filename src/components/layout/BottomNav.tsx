import { Link, useLocation } from "react-router-dom";
import { Terminal, TrendingUp, Grid } from "lucide-react";
import { cn } from "../../lib/utils";

const BottomNav = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: <Terminal size={20} /> },
    { name: "Trending", path: "/trending", icon: <TrendingUp size={20} /> },
    { name: "Categories", path: "/categories", icon: <Grid size={20} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
              location.pathname === link.path
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {link.icon}
            <span className="text-[10px] font-medium">{link.name}</span>
            {location.pathname === link.path && (
              <span className="w-1 h-1 bg-primary rounded-full absolute bottom-2" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
