import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Check } from "lucide-react";
import ArticleCard from "../components/ui/Card";
import { useArticles } from "../hooks/useNews";
import { ArticleCardSkeleton } from "../components/ui/ArticleCardSkeleton";
import { POPULAR_TAGS, MORE_TAGS } from "../constants/tags";

const Categories = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(["react"]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Combine for the modal view
  const allTags = Array.from(new Set([...POPULAR_TAGS, ...MORE_TAGS])).sort();

  const {
    articles,
    loading,
    loadMore,
    hasMore,
    isFetchingMore
  } = useArticles({
    limit: 12,
    // Join tags with comma. If empty, pass undefined to fetch all (or handled by api logic)
    category: selectedTags.length > 0 ? selectedTags.join(",").toLowerCase() : undefined
  });

  const toggleTag = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    setSelectedTags(prev =>
      prev.includes(lowerTag)
        ? prev.filter(t => t !== lowerTag)
        : [...prev, lowerTag]
    );
  };

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
    <div className="space-y-8 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Browse by Category</h1>
            <p className="text-muted-foreground mt-1">Discover stories that matter to you.</p>
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className={`p-3 rounded-full transition-all relative group ${selectedTags.length > 0 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            aria-label="Filter Tags"
          >
            <Filter size={24} />
            {selectedTags.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full border-2 border-background">
                {selectedTags.length}
              </span>
            )}
            {/* Tooltip */}
            <span className="absolute -bottom-8 right-0 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              More Filters
            </span>
          </button>
        </div>

        {/* Popular Tags Quick Select */}
        <div className="flex flex-wrap gap-2 pt-2">
          {POPULAR_TAGS.map((tag) => {
            const isSelected = selectedTags.includes(tag.toLowerCase());
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border ${isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Active Filters Display */}
        {selectedTags.length > 0 && (
          <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-2 no-scrollbar">
            <span className="text-sm text-muted-foreground mr-2 whitespace-nowrap">Active Filters:</span>
            {selectedTags.map(tag => (
              <button
                key={`active-${tag}`}
                onClick={() => toggleTag(tag)}
                className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 flex items-center gap-1 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors whitespace-nowrap"
              >
                <span className="capitalize">{tag}</span>
                <X size={12} />
              </button>
            ))}
            <button
              onClick={() => setSelectedTags([])}
              className="text-xs text-muted-foreground hover:text-foreground underline ml-2 whitespace-nowrap"
            >
              Clear all
            </button>
          </div>
        )}
      </motion.div>

      {/* Article Grid */}
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

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No articles found for these tags.</p>
          <button
            onClick={() => setSelectedTags([])}
            className="mt-4 text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-background border border-border rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-2xl font-bold">Filter Articles</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="flex flex-wrap gap-3">
                  {allTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag.toLowerCase());
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-2 border ${isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary/50 hover:bg-secondary text-muted-foreground border-transparent hover:text-foreground"
                          }`}
                      >
                        <span>{tag}</span>
                        {isSelected && <Check size={14} />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="p-6 border-t border-border flex justify-end space-x-4 bg-background/50 backdrop-blur-md rounded-b-2xl">
                <button
                  onClick={() => setSelectedTags([])}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-6 py-2 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-opacity"
                >
                  Show {articles.length > 0 ? `${articles.length}+` : ''} Articles
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Categories;
