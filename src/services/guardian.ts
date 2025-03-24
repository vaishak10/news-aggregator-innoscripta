import axios, { AxiosError } from 'axios';
import { Article, NewsFilters } from '../types/news';

const API_KEY = import.meta.env.VITE_THE_GUARDIAN_API_KEY;
const BASE_URL = 'https://content.guardianapis.com/search';

interface GuardianAPIError {
  response?: {
    status: string;
    message: string;
  };
  message?: string;
}

export const fetchGuardianNews = async (filters: NewsFilters) => {
  try {
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
      })).filter(Boolean),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<GuardianAPIError>;
      
      switch (axiosError.response?.status) {
        case 401:
          throw new Error('Invalid Guardian API key. Please check your API key configuration.');
        
        case 403:
          throw new Error('Access denied to The Guardian API. Please check your API permissions.');
        
        case 429:
          throw new Error('Guardian API request quota exceeded. Please try again later.');
        
        case 400:
          throw new Error(
            axiosError.response.data?.message || 
            'Invalid request parameters for The Guardian API.'
          );

        case 404:
          throw new Error('The requested Guardian content was not found.');

        case 500:
          throw new Error('The Guardian API service is currently unavailable. Please try again later.');
        
        default:
          throw new Error(
            axiosError.response?.data?.message || 
            'An error occurred while fetching news from The Guardian API.'
          );
      }
    }

    if (error instanceof Error) {
      throw new Error(`Guardian API Error: ${error.message}`);
    }

    throw new Error('An unexpected error occurred with The Guardian API');
  }
};