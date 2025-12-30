import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import PricingModal from "../ui/PricingModal";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun size={20} />;
      case 'dark': return <Moon size={20} />;
      default: return <Monitor size={20} />;
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-border ${scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-transparent border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                <Zap className="text-primary transform group-hover:-rotate-12 transition-transform duration-300" size={24} fill="currentColor" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                TechNews
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-6 text-sm font-medium text-muted-foreground">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <Link to="/latest" className="hover:text-primary transition-colors">Latest</Link>
                <Link to="/trending" className="hover:text-primary transition-colors">Trending</Link>
                <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
              </div>

              <div className="flex items-center space-x-4 pl-8 border-l border-border">
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:bg-secondary rounded-full text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  title={`Theme: ${theme}`}
                  aria-label="Toggle theme"
                >
                  {getThemeIcon()}
                </button>
                <button
                  onClick={() => setIsPricingOpen(true)}
                  className="bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-primary/10"
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-secondary rounded-full text-muted-foreground hover:text-primary transition-colors"
              >
                {getThemeIcon()}
              </button>

              <button
                onClick={() => setIsPricingOpen(true)}
                className="group px-6 py-2 bg-foreground text-background font-semibold rounded-full hover:opacity-90 transition-all flex items-center shadow-lg shadow-primary/5"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </nav>

      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </>
  );
};

export default Navbar;
