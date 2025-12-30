import { useEffect } from "react";
import { motion } from "framer-motion";
import ArticleCard from "../components/ui/Card";
import { useArticles } from "../hooks/useNews";
import { ArticleCardSkeleton } from "../components/ui/ArticleCardSkeleton";
import { TrendingUp as TrendingIcon } from "lucide-react";

const Trending = () => {
  const { 
    articles, 
    loading, 
    loadMore, 
    hasMore, 
    isFetchingMore 
  } = useArticles({ 
    limit: 12, 
    top: 7 // Top of the week
  });

  // Scroll Event
  useEffect(() => {
    const handleScroll = () => {
       if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 100
        && hasMore && !loading && !isFetchingMore
      ) {
        loadMore();
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, isFetchingMore, loadMore]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-3 bg-red-500/10 rounded-full">
            <TrendingIcon className="text-red-500" size={32} />
        </div>
        <div>
            <h1 className="text-4xl font-bold text-foreground">Trending Now</h1>
            <p className="text-muted-foreground">The most read stories across the tech world.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(loading && articles.length === 0) ? (
            [...Array(6)].map((_, i) => <ArticleCardSkeleton key={`initial-${i}`} />)
        ) : (
            articles.map((article, index) => (
              <ArticleCard key={`${article.id}-${index}`} article={article} index={index} />
            ))
        )}
      </div>

     {(isFetchingMore) && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
             {[...Array(3)].map((_, i) => (
               <ArticleCardSkeleton key={`more-${i}`} />
             ))}
         </div>
      )}

      {!hasMore && articles.length > 0 && (
        <div className="text-center mt-12 py-8 text-muted-foreground">
          You've reached the end of the list.
        </div>
      )}
    </div>
  );
};

export default Trending;
