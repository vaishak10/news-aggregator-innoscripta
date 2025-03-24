import axios, { AxiosError } from 'axios';
import { Article, NewsFilters } from '../types/news';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

interface NewsAPIError {
  status: string;
  code: string;
  message: string;
}

export const fetchNewsApi = async (filters: NewsFilters) => {
  try {
    const params = {
      apiKey: API_KEY,
      q: filters?.search,
      category: filters?.category ?? 'General',
      from: filters?.dateFrom,
      to: filters?.dateTo,
      language: 'en',
      sortBy: 'publishedAt',
    };

    const response = await axios.get(`${BASE_URL}/top-headlines`, { params });
  
    return {
      articles: response.data.articles.map((article: any): Article => ({
        id: article?.url,
        title: article?.title,
        description: article?.description,
        content: article?.content,
        url: article?.url,
        imageUrl: article?.urlToImage,
        source: article?.source?.name,
        category: filters?.category || 'General',
        publishedAt: article?.publishedAt,
        author: article?.author,
      })).filter(Boolean),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<NewsAPIError>;
      
      switch (axiosError.response?.status) {
        case 401:
          throw new Error('Invalid NewsAPI key. Please check your API key configuration.');
        
        case 429:
          throw new Error('NewsAPI request quota exceeded. Please try again later.');
        
        case 400:
          throw new Error(
            axiosError.response.data?.message || 
            'Invalid request parameters for NewsAPI.'
          );

        case 500:
          throw new Error('NewsAPI service is currently unavailable. Please try again later.');
        
        default:
          throw new Error(
            axiosError.response?.data?.message || 
            'An error occurred while fetching news from NewsAPI.'
          );
      }
    }

    throw new Error(
      error instanceof Error ? error.message : 'An unexpected error occurred with NewsAPI'
    );
  }
}; 