import { useState, useEffect, useCallback } from "react";

export function useInfiniteScroll<T>(data: T[], itemsPerPage = 6) {
  const [displayedItems, setDisplayedItems] = useState<T[]>(data.slice(0, itemsPerPage));
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(() => {
    const nextItems = data.slice(0, (page + 1) * itemsPerPage);
    setDisplayedItems(nextItems);
    setPage((p) => p + 1);
    
    if (nextItems.length >= data.length) {
      setHasMore(false);
    }
  }, [data, page, itemsPerPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        !== document.documentElement.offsetHeight || 
        !hasMore
      ) {
        return;
      }
      loadMore();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadMore]);

  return { displayedItems, hasMore };
}
