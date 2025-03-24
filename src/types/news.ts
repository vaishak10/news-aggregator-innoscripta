export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl?: string;
  source: string;
  category: string;
  publishedAt: string;
  author?: string;
}

export interface NewsFilters {
  search?: string;
  category?: string;
  source?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface NewsSource {
  id: string;
  name: string;
  enabled: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
} 