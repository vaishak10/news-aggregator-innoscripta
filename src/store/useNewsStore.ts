import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewsSource, Category } from '../types/news';

interface NewsStore {
  selectedSources: NewsSource[];
  selectedCategories: Category[];
  setSelectedSources: (sources: NewsSource[]) => void;
  setSelectedCategories: (categories: Category[]) => void;
  toggleSource: (sourceId: string) => void;
  toggleCategory: (categoryId: string) => void;
}

export const useNewsStore = create<NewsStore>()(
  persist(
    (set) => ({
      selectedSources: [],
      selectedCategories: [],
      setSelectedSources: (sources) => set({ selectedSources: sources }),
      setSelectedCategories: (categories) => set({ selectedCategories: categories }),
      toggleSource: (sourceId) =>
        set((state) => ({
          selectedSources: state.selectedSources.map((source) =>
            source.id === sourceId ? { ...source, enabled: !source.enabled } : source
          ),
        })),
      toggleCategory: (categoryId) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.map((category) =>
            category.id === categoryId ? { ...category, enabled: !category.enabled } : category
          ),
        })),
    }),
    {
      name: 'news-preferences',
    }
  )
); 