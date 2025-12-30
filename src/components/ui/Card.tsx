import { Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Article } from "../../types";

interface ArticleCardProps {
  article: Article;
  index: number;
}

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  // varied delay based on index but capped to reset every few items to avoid huge delays
  const delay = (index % 6) * 0.1; 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className="group"
    >
      <Link to={`/article/${article.id}`} className="block h-full">
        <div className="bg-card border border-border rounded-2xl overflow-hidden h-full hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-xs font-medium text-white rounded-full border border-white/10">
                {article.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center space-x-4 mb-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(article.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                {article.readTime}
              </div>
            </div>

            <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>

            <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
              {article.summary}
            </p>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-transparent">
                  {tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="text-[10px] px-2 py-0.5 text-muted-foreground">+{article.tags.length - 3}</span>
              )}
            </div>

            {/* Author */}
            <div className="flex items-center mt-auto pt-4 border-t border-border">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full mr-3 border border-border"
              />
              <span className="text-sm font-medium text-foreground">
                {article.author.name}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;
