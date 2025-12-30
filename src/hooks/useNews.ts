import { useState, useCallback, useEffect, useRef } from "react";
import { fetchArticles, fetchArticleById } from "../lib/api";
import type { Article } from "../types";

// --- Types ---

interface UseArticlesOptions {
  limit?: number;
  tag?: string;
  category?: string;
  top?: number;
  initialPage?: number;
}

interface UseArticlesResult {
  articles: Article[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
  isFetchingMore: boolean;
}

interface UseArticleResult {
  article: Article | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// --- Hooks ---

/**
 * Hook to fetch a list of articles with pagination (infinite scroll support).
 */
export const useArticles = ({
  limit = 10,
  tag,
  category,
  top,
  initialPage = 1,
}: UseArticlesOptions = {}): UseArticlesResult => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  // Keep track of the AbortController to cancel previous requests
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Track mounting to avoid state updates on unmounted component
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const fetchData = useCallback(
    async (pageNum: number, isLoadMore: boolean) => {
      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Create new controller
      const controller = new AbortController();
      abortControllerRef.current = controller;

      if (!isLoadMore) {
        setLoading(true);
      } else {
        setIsFetchingMore(true);
      }
      setError(null);

      try {
        const queryTag = tag || category?.toLowerCase();
        const data = await fetchArticles(pageNum, limit, queryTag, top, controller.signal);

        if (!isMounted.current) return;

        if (isLoadMore) {
          setArticles((prev) => [...prev, ...data]);
        } else {
          setArticles(data);
        }

        // Check if we have more data
        if (data.length < limit) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (err: unknown) {
        if (!isMounted.current) return;
        if (err instanceof Error && err.name === "AbortError") {
          // Ignore abort errors
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to fetch articles");
      } finally {
        if (isMounted.current) {
          if (!isLoadMore) {
            setLoading(false);
          } else {
            setIsFetchingMore(false);
          }
        }
      }
    },
    [limit, tag, category, top]
  );

  // Initial Fetch
  useEffect(() => {
    setPage(initialPage);
    setHasMore(true);
    setArticles([]); // Clear previous when filters change
    fetchData(initialPage, false);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, initialPage]);

  const loadMore = useCallback(async () => {
    if (loading || isFetchingMore || !hasMore) return;
    
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchData(nextPage, true);
  }, [loading, isFetchingMore, hasMore, page, fetchData]);

  const refetch = useCallback(async () => {
    setPage(1);
    setHasMore(true);
    await fetchData(1, false);
  }, [fetchData]);

  return { articles, loading, error, hasMore, loadMore, refetch, isFetchingMore };
};

/**
 * Hook to fetch a single article by ID.
 */
export const useArticle = (id?: string): UseArticleResult => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchArticleById(id, controller.signal);
      if (!data) throw new Error("Article not found");
      setArticle(data);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Failed to fetch article");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
       fetchDetail();
    } else {
        setLoading(false);
    }
    
    return () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };
  }, [fetchDetail, id]);

  return { article, loading, error, refetch: fetchDetail };
};
