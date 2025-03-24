import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import NewsList from '../components/news/NewsList';
import NewsFilters from '../components/news/NewsFilters';
import { NewsFilters as NewsFiltersType } from '../types/news';
import { fetchNewsApi } from '../services/newsApi';
import { fetchGuardianNews } from '../services/guardian';
import { fetchNYTimesNews } from '../services/newyorktimes';

const Home = () => {
  const [filters, setFilters] = useState<NewsFiltersType>({});
  const [bookmarkedArticles] = useState<Set<string>>(new Set());
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['news', filters],
    queryFn: async () => {
      if (!filters?.source || filters?.source === 'All') {
        const [newsApiData, guardianData, nyTimesData] = await Promise.all([
          fetchNewsApi(filters),
          fetchGuardianNews(filters),
          fetchNYTimesNews(filters)
        ]);
        return {
          articles: [
            ...newsApiData.articles,
            ...guardianData.articles, 
            ...nyTimesData.articles
          ]
        };
      } else if (filters.source === 'NewsAPI') {
        return fetchNewsApi(filters);
      } else if (filters.source === 'The Guardian') {
        return fetchGuardianNews(filters);
      } else if (filters.source === 'New York Times') {
        return fetchNYTimesNews(filters);
      }
      return { articles: [] };
    },
  });

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3, color: '#000000' }}>
        Latest News
      </Typography>
      
      <NewsFilters
        filters={filters}
        onFiltersChange={setFilters}
        categories={['All', 'Technology', 'Business', 'Sports', 'Entertainment', 'Health']}
        sources={['All', 'NewsAPI', 'The Guardian', 'New York Times']}
      />

      <NewsList
        articles={data?.articles || []}
        isLoading={isLoading}
        error={error as Error}
        onArticleClick={(article) => window.open(article.url, '_blank')}
        onBookmarkToggle={() => {}}
        bookmarkedArticles={bookmarkedArticles}
      />
    </Container>
  );
};

export default Home; 