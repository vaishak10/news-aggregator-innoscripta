import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        {error.message}
      </Typography>
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
    <Grid container spacing={isMobile ? 2 : 3}>
      {articles.map((article) => (
        <Grid item key={article.id} xs={12} sm={6} md={4} lg={3}>
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