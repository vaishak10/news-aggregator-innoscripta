import axios, { AxiosError } from 'axios';
import { Article, NewsFilters } from '../types/news';

const API_KEY = import.meta.env.VITE_NEW_YORK_TIMES_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

interface NYTimesAPIError {
  fault?: {
    faultstring: string;
  };
  message?: string;
  errors?: Array<{
    message: string;
    code: string;
  }>;
}

export const fetchNYTimesNews = async (filters: NewsFilters) => {
  try {
    const params = {
      'api-key': API_KEY,
      'q': filters?.search || '',
      'fq': filters?.category ? `news_desk:(${filters.category})` : '',
      'begin_date': filters?.dateFrom?.split('T')[0]?.replace(/-/g, ''),
      'end_date': filters?.dateTo?.split('T')[0]?.replace(/-/g, ''),
      'sort': 'newest',
    };
  
    const response = await axios.get(BASE_URL, { params });
    
    return {
      articles: response.data.response.docs.map((article: any): Article => ({
        id: article._id,
        title: article.headline.main,
        description: article.abstract || article.snippet,
        content: article.lead_paragraph,
        url: article.web_url,
        imageUrl: article.multimedia?.[0]?.url 
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : undefined,
        source: 'The New York Times',
        category: article.news_desk || article.section_name || 'General',
        publishedAt: article.pub_date,
        author: article.byline?.original?.replace('By ', '') || 'The New York Times',
      })).filter(Boolean),
    };
  }  catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<NYTimesAPIError>;
      
      switch (axiosError.response?.status) {
        case 401:
          throw new Error('Invalid New York Times API key. Please check your API key configuration.');
        
        case 403:
          throw new Error('Access denied to New York Times API. Please check your API permissions.');
        
        case 429:
          throw new Error('New York Times API rate limit exceeded. Please try again later.');
        
        case 400: {
          const errorMessage = axiosError.response.data?.errors?.[0]?.message ||
                             axiosError.response.data?.fault?.faultstring ||
                             'Invalid request parameters for New York Times API.';
          throw new Error(errorMessage);
        }

        case 404:
          throw new Error('The requested New York Times content was not found.');

        case 500:
          throw new Error('New York Times API service is currently unavailable. Please try again later.');
        
        default: {
          const errorMessage = axiosError.response?.data?.fault?.faultstring ||
                             axiosError.response?.data?.message ||
                             'An error occurred while fetching news from New York Times API.';
          throw new Error(errorMessage);
        }
      }
    }

    if (error instanceof Error) {
      throw new Error(`New York Times API Error: ${error.message}`);
    }

    throw new Error('An unexpected error occurred with the New York Times API');
  }
};