import axios from 'axios';
import { Article, NewsFilters } from '../types/news';

const API_KEY = import.meta.env.VITE_THE_GUARDIAN_API_KEY;
const BASE_URL = 'https://content.guardianapis.com/search';

export const fetchGuardianNews = async (filters: NewsFilters) => {
  const params = {
    'api-key': API_KEY,
    'q': filters?.search || '',
    'section': filters?.category?.toLowerCase(),
    'from-date': filters?.dateFrom,
    'to-date': filters?.dateTo,
    'show-fields': 'thumbnail,bodyText',
    'show-tags': 'contributor',
    'order-by': 'newest',
    'page-size': 50,
  };

  const response = await axios.get(BASE_URL, { params });
  
  return {
    articles: response.data.response.results.map((article: any): Article => ({
      id: article.id,
      title: article.webTitle,
      description: article.fields?.bodyText?.substring(0, 200) + '...',
      content: article.fields?.bodyText,
      url: article.webUrl,
      imageUrl: article.fields?.thumbnail,
      source: 'The Guardian',
      category: article.sectionName,
      publishedAt: article.webPublicationDate,
      author: article.tags?.[0]?.webTitle || 'The Guardian',
    })),
  };
};