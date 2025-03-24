import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, Alert, AlertTitle } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import NewsList from '../components/news/NewsList';
import NewsFilters from '../components/news/NewsFilters';
import { NewsFilters as NewsFiltersType } from '../types/news';
import { fetchNewsApi } from '../services/newsApi';
import { fetchGuardianNews } from '../services/guardian';
import { fetchNYTimesNews } from '../services/newyorktimes';

const Home = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<NewsFiltersType>({
    search: searchParams.get('search') || ''
  });
  const [bookmarkedArticles] = useState<Set<string>>(new Set());
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const searchTerm = searchParams.get('search');
    setFilters(prev => ({
      ...prev,
      search: searchTerm || ''
    }));
  }, [searchParams]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['news', filters],
    queryFn: async () => {
      if (filters?.search || !filters?.source || filters?.source === 'All') {
        setApiErrors({});
        
        const results = await Promise.allSettled([
          fetchNewsApi(filters),
          fetchGuardianNews(filters),
          fetchNYTimesNews(filters)
        ]);
        
        const [newsApiResult, guardianResult, nytResult] = results;
        
        const newErrors: Record<string, string> = {};
        
        if (newsApiResult.status === 'rejected') {
          newErrors['NewsAPI'] = newsApiResult.reason?.message || 'Failed to fetch from NewsAPI';
        }
        if (guardianResult.status === 'rejected') {
          newErrors['The Guardian'] = guardianResult.reason?.message || 'Failed to fetch from The Guardian';
        }
        if (nytResult.status === 'rejected') {
          newErrors['New York Times'] = nytResult.reason?.message || 'Failed to fetch from New York Times';
        }
        
        setApiErrors(newErrors);

        const articles = [
          ...(newsApiResult.status === 'fulfilled' ? newsApiResult.value.articles : []),
          ...(guardianResult.status === 'fulfilled' ? guardianResult.value.articles : []),
          ...(nytResult.status === 'fulfilled' ? nytResult.value.articles : [])
        ];

        return { articles };
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
    <Container>
      <Typography variant="h4" sx={{ mb: 3, color: '#000000' }}>
        Latest News
      </Typography>
      
      {Object.entries(apiErrors).map(([source, errorMessage]) => (
        <Alert 
          severity="warning" 
          sx={{ mb: 2 }}
          key={source}
          onClose={() => {
            setApiErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors[source];
              return newErrors;
            });
          }}
        >
          <AlertTitle>{source} Error</AlertTitle>
          {errorMessage}
        </Alert>
      ))}

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