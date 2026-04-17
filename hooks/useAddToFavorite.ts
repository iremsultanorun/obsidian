import { useFavoriteStore } from "@/store/useFavoriteStore";
import { IProduct } from "@/types/product";

export const useAddToFavorite = () => {
  const { removeFromFavorites, addToFavorites } = useFavoriteStore();

  const handleToggleFavorite = (e: React.MouseEvent, product: IProduct, currentlyFavorited: boolean) => {
    e.stopPropagation();
    
    if (currentlyFavorited) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return handleToggleFavorite;
};