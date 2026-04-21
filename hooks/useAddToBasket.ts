import { useBasketStore } from "@/store/useBasketStore";
import { IProduct } from "@/types/product";

export const useAddToBasket = () => {
  const { addToBasket, setFlyingImage, items, mainImagePos } = useBasketStore();

  const handleAddToBasket = (
    e: React.MouseEvent, 
    product: IProduct, 
    specificImage?: string,
    imageRef?: React.RefObject<HTMLDivElement | null>
  ) => {
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem && existingItem.quantity >= 10) {
e.stopPropagation()
      addToBasket(product); 
      return; 
    }

    let rect;
    if (imageRef?.current) {
      rect = imageRef.current.getBoundingClientRect();
    } else if (mainImagePos) {
      rect = mainImagePos;
    } else {
      rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    }

    setFlyingImage({
      src: specificImage || product.images[0],
      startPos: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      },
    });
e.stopPropagation()
    addToBasket(product);
  };

  return handleAddToBasket;
};