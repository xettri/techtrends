export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}
