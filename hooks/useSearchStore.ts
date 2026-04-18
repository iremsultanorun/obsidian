import { create } from 'zustand';
import { IProduct } from '@/types/product';

interface SearchState {
  isOpen: boolean;
  query: string;
  allProducts: IProduct[]; 
  filteredResults: IProduct[];
  isLoading: boolean;
  
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (query: string) => void;
  setAllProducts: (products: IProduct[]) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  isOpen: false,
  query: '',
  allProducts: [],
  filteredResults: [],
  isLoading: false,

  openSearch: () => set({ isOpen: true }),
  
  closeSearch: () => set({ 
    isOpen: false, 
    query: '', 
    filteredResults: [] 
  }),

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