import axios from 'axios';
import { Article, NewsFilters } from '../types/news';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNewsApi = async (filters: NewsFilters) => {
  const params = {
    apiKey: API_KEY,
    q: filters?.search,
    category: filters?.category ?? 'General',
    sources: filters?.source,
    from: filters?.dateFrom,
    to: filters?.dateTo,
    language: 'en',
    sortBy: 'publishedAt',
  };

  const response = await axios.get(`${BASE_URL}/everything`, { params });
  
  return {
    articles: response.data.articles.map((article: any): Article => ({
      id: article?.url,
      title: article?.title,
      description: article?.description,
      content: article?.content,
      url: article?.url,
      imageUrl: article?.urlToImage,
      source: article?.source?.name,
      category: article?.category || 'General',
      publishedAt: article?.publishedAt,
      author: article?.author,
    })),
  };
}; 