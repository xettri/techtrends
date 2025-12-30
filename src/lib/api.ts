import type { Article } from "../types";

const API_BASE_URL = "https://dev.to/api";

interface DevToUser {
  name: string;
  profile_image: string;
  username: string;
}

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  cover_image: string | null;
  social_image: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags?: string[]; // Single article endpoint might use this or omit both
  url: string;
  user: DevToUser;
  body_html?: string; // For single article details
  body_markdown?: string;
}

export const mapDevToArticle = (data: DevToArticle): Article => {
  let tags = data.tag_list || data.tags || [];
  if (typeof tags === 'string') {
    tags = (tags as string).split(',').map((tag: string) => tag.trim());
  }
  return {
    id: data.id.toString(),
    title: data.title,
    summary: data.description,
    content: data.body_html || data.body_markdown || data.description, // Fallback
    category: tags[0] ? tags[0].charAt(0).toUpperCase() + tags[0].slice(1) : "Tech",
    author: {
      name: data.user.name,
      username: data.user.username,
      avatar: data.user.profile_image,
    },
    publishedAt: data.published_at,
    readTime: `${data.reading_time_minutes} min read`,
    imageUrl: data.cover_image || data.social_image || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop", // Fallback image
    tags: tags,
  };
};

export const fetchArticles = async (page = 1, limit = 12, tag?: string, top?: number, signal?: AbortSignal): Promise<Article[]> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: limit.toString(),
      tags_exclude: "jokes,discuss",
      top: top && typeof top === 'number' ? top.toString() : "7"
    });

    if (tag) {
      if (tag.includes(',')) {
        params.append("tags", tag);
      } else {
        params.append("tag", tag);
      }
    }

    const response = await fetch(`${API_BASE_URL}/articles?${params.toString()}`, { signal });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const data: DevToArticle[] = await response.json();
    return data.map(mapDevToArticle);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const fetchArticleById = async (id: string, signal?: AbortSignal): Promise<Article | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, { signal });

    if (!response.ok) {
      return null;
    }

    const data: DevToArticle = await response.json();
    return mapDevToArticle(data);
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};

export const fetchTrendingArticles = async (limit = 6, signal?: AbortSignal): Promise<Article[]> => {
  // Dev.to doesn't have a strict "trending" endpoint in the same way, but 'top' works
  try {
    const response = await fetch(`${API_BASE_URL}/articles?top=7&per_page=${limit}`, { signal }); // top=7 means top of the week
    if (!response.ok) throw new Error("Failed to fetch trending");
    const data: DevToArticle[] = await response.json();
    return data.map(mapDevToArticle);
  } catch (error) {
    console.error("Error fetching trending:", error);
    return [];
  }
}
