import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "@/types/product";

interface FavoriteState {
  favorites: IProduct[];
  addToFavorites: (product: IProduct) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (product) => 
        set((state) => ({ favorites: [...state.favorites, product] })),
      removeFromFavorites: (productId) =>
        set((state) => ({ favorites: state.favorites.filter(p => p.id !== productId) })),
      isFavorite: (productId) => 
        get().favorites.some(p => p.id === productId),
    }),
    { name: "favorites" }
  )
);