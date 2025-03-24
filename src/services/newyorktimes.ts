import axios from 'axios';
import { Article, NewsFilters } from '../types/news';

const API_KEY = import.meta.env.VITE_NEW_YORK_TIMES_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

export const fetchNYTimesNews = async (filters: NewsFilters) => {
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
    })),
  };
};