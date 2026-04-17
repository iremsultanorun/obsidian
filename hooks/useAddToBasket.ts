import { useBasketStore } from "@/store/useBasketStore";
import { IProduct } from "@/types/product";

export const useAddToBasket = () => {
  const { addToBasket, setFlyingImage } = useBasketStore();

  const handleAddToBasket = (e: React.MouseEvent, product: IProduct, specificImage?: string,imageRef?: React.RefObject<HTMLDivElement | null>) => {
    const targetElement = imageRef?.current || (e.currentTarget as HTMLElement);
    const rect = targetElement.getBoundingClientRect();
    
    const imageToFly = specificImage || product.images[0];

    setFlyingImage({
      src: imageToFly,
      startPos: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      },
    });

    addToBasket(product);
  };

  return handleAddToBasket;
};