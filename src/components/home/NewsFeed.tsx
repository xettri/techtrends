import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ArticleCard from "../ui/Card";
import { fetchArticles } from "../../lib/api";
import type { Article } from "../../types";

interface NewsFeedProps {
  limit?: number;
  enableInfiniteScroll?: boolean;
}

const NewsFeed = ({ limit, enableInfiniteScroll = true }: NewsFeedProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Initial Fetch
  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      const data = await fetchArticles(1, limit || 6); // Fetch exactly limit if provided, else batch of 6
      setArticles(data);
      setLoading(false);
      if (limit && data.length >= limit) setHasMore(false); // If limit set, no more scrolling
    };
    loadInitial();
  }, [limit]);

  // Infinite Scroll Fetch
  const loadMore = async () => {
    if (!enableInfiniteScroll || loading || isFetching) return;
    
    // Safety check just in case
    if (limit) return;

    setIsFetching(true);
    const nextPage = page + 1;
    const moreArticles = await fetchArticles(nextPage, 6);
    
    if (moreArticles.length === 0) {
      setHasMore(false);
    } else {
      setArticles(prev => [...prev, ...moreArticles]);
      setPage(nextPage);
    }
    setIsFetching(false);
  };

  // Scroll Event
  useEffect(() => {
    if (!enableInfiniteScroll || limit) return;

    const handleScroll = () => {
       if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 100 // Buffer
        && hasMore && !loading && !isFetching
      ) {
        loadMore();
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableInfiniteScroll, limit, hasMore, loading, isFetching, page]); // Re-attach listener on state change


  if (loading && articles.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground flex items-center">
          <span className="w-2 h-8 bg-primary rounded-full mr-3"></span>
          {limit ? "Latest Articles" : "All News"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <ArticleCard key={`${article.id}-${index}`} article={article} index={index} />
        ))}
      </div>

      {enableInfiniteScroll && hasMore && (
         <div className="flex justify-center mt-12 py-8">
             {/* We can show a loader or just invisible trigger */}
             <Loader2 className="animate-spin text-primary" size={32} />
         </div>
      )}

      {enableInfiniteScroll && !hasMore && (
        <div className="text-center mt-12 py-8 text-muted-foreground">
          You've reached the end of the list.
        </div>
      )}
    </section>
  );
};

export default NewsFeed;
