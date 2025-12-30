import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-20 md:pb-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Bio */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Zap className="text-primary transform -rotate-12" size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                TechNews
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Curating the most important stories in technology, development, and engineering. Stay ahead of the curve.
            </p>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Content</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/latest" className="hover:text-primary transition-colors">Latest News</Link></li>
              <li><Link to="/trending" className="hover:text-primary transition-colors">Trending</Link></li>
              <li><Link to="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest tech news delivered to your inbox weekly.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="bg-secondary/50 border border-border text-foreground px-4 py-2 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground/50 transition-all"
              />
              <button
                aria-label="Subscribe"
                className="bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <Zap size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TechNews Platform. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
