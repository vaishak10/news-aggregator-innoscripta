import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import NewsList from '../components/news/NewsList';

const Bookmarks = () => {
  const [bookmarkedArticles] = useState<Set<string>>(new Set());
  const [articles] = useState([]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3, color: '#000000' }}>
        Bookmarked Articles
      </Typography>

      <NewsList
        articles={articles}
        isLoading={false}
        error={null}
        onArticleClick={(article) => window.open(article.url, '_blank')}
        onBookmarkToggle={() => {}}
        bookmarkedArticles={bookmarkedArticles}
      />
    </Container>
  );
};

export default Bookmarks;
