import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import { Article } from '../../types/news';
import NewsCard from './NewsCard';

interface NewsListProps {
  articles: Article[];
  isLoading: boolean;
  error?: Error;
  onArticleClick: (article: Article) => void;
  onBookmarkToggle: (article: Article) => void;
  bookmarkedArticles: Set<string>;
}

const NewsList = ({
  articles,
  isLoading,
  error,
  onArticleClick,
  onBookmarkToggle,
  bookmarkedArticles,
}: NewsListProps) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading articles: {error.message}</Typography>
      </Box>
    );
  }

  if (articles.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No articles found.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ p: 3, ml: -6.5 }}>
      {articles.map((article) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
          <NewsCard
            article={article}
            isBookmarked={bookmarkedArticles.has(article.id)}
            onBookmarkToggle={() => onBookmarkToggle(article)}
            onClick={() => onArticleClick(article)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsList; 