import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] -z-10" />

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium"
        >
          <Sparkles size={14} className="mr-2" />
          <span>The Tech News Platform for Pros</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight"
        >
          Stay Ahead of the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent">
            Tech Curve
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Curated deep dives, breaking news, and expert insights for developers, engineers, and tech enthusiasts.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center space-x-4"
        >
          <Link
            to="/latest"
            className="group px-8 py-3 bg-foreground text-background font-semibold rounded-full hover:opacity-90 transition-all flex items-center shadow-lg shadow-primary/5"
          >
            Start Reading
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
