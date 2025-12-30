import NewsFeed from "../components/home/NewsFeed";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

const Latest = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-3 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full">
          <Newspaper className="text-primary" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Latest News</h1>
          <p className="text-muted-foreground">Catch up on everything happening in tech.</p>
        </div>
      </motion.div>

      <NewsFeed enableInfiniteScroll={true} />
    </div>
  );
};

export default Latest;
