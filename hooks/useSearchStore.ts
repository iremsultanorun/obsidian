import { create } from 'zustand';
import { IProduct } from '@/types/product';

interface SearchState {
  query: string;
  allProducts: IProduct[]; 
  filteredResults: IProduct[];
  isLoading: boolean;

  setQuery: (query: string) => void;
  setAllProducts: (products: IProduct[]) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({

  query: '',
  allProducts: [],
  filteredResults: [],
  isLoading: false,


  setAllProducts: (products) => set({ allProducts: products }),

  setQuery: (query) => {
    set({ query, isLoading: true });

    if (query.trim() === '') {
      set({ filteredResults: [], isLoading: false });
    } else {
      const searchTerms = query.toLowerCase();
      const results = get().allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerms) ||
        product.category.toLowerCase().includes(searchTerms) ||
        product.brand?.toLowerCase().includes(searchTerms)
      );
      
      set({ filteredResults: results, isLoading: false });
    }
  },

  clearSearch: () => set({ query: '', filteredResults: [] }),
}));