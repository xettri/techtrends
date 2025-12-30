import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Share2, Check, Sun, Moon, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { fetchArticleById } from "../lib/api";
import type { Article } from "../types";
import { useTheme } from "../components/ThemeProvider";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun size={18} />;
      case 'dark': return <Moon size={18} />;
      default: return <Monitor size={18} />;
    }
  };

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;
      setLoading(true);
      const data = await fetchArticleById(id);
      setArticle(data);
      setLoading(false);
    };
    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 items-center justify-center flex">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-24 text-center px-4">
        <h2 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h2>
        <Link to="/" className="text-primary hover:underline">Return Home</Link>
      </div>
    );
  }

  console.log("article", article)

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20"
    >
      {/* Header Image */}
      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent z-10" />
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-10 left-0 w-full p-6 md:p-12 z-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider mb-4 inline-block">
                {article.category}
              </span>
              <h1 className="text-shadow-sm text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full border-2 border-primary mr-3 cursor-pointer"
                    onClick={() => window.open(`https://dev.to/${article.author?.username}`, '_blank')}
                  />
                  <span className="font-medium text-foreground cursor-pointer" onClick={() => window.open(`https://dev.to/${article.author?.username}`, '_blank')}>{article.author.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-primary" />
                  {new Date(article.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2 text-primary" />
                  {article.readTime}
                </div>
              </div>
            </motion.div>

            <div className="flex justify-between items-start">
              <div className="flex flex-wrap gap-2">
                {article?.tags?.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md border border-transparent">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  title={copied ? "Copied!" : "Share Article"}
                >
                  {copied ? <Check size={20} className="text-green-500" /> : <Share2 size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-5 left-0 w-full px-4 md:px-8 z-20 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center text-foreground hover:text-foreground/80 bg-background/40 hover:bg-background/60 backdrop-blur-md px-4 py-2 rounded-full transition-all shadow-sm"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Link>

          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center text-foreground hover:text-foreground/80 bg-background/40 hover:bg-background/60 backdrop-blur-md p-2 rounded-full transition-all cursor-pointer shadow-sm"
            title={`Theme: ${theme}`}
            aria-label="Toggle theme"
          >
            {getThemeIcon()}
          </button>


        </div>
      </div>

      {/* Content */}
      <div className="w-full mx-auto px-6 border-t border-border">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="prose dark:prose-invert prose-lg max-w-4xl mx-auto"
        >
          {/* We assume article.content is an HTML string from Dev.to */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </motion.div>
      </div>
    </motion.article>
  );
};

export default ArticlePage;
