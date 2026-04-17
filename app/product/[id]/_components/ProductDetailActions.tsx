"use client";
import { ShoppingCart } from "lucide-react";
import styles from "./../product.module.css";
import { useAddToBasket } from "@/hooks/useAddToBasket";
import { IProductDetail } from "@/types/product";

import FavoriteButton from "@/components/common/FavoriteButton";
export default function ProductDetailActions({ product }: { product: IProductDetail }) {
  const addToBasket = useAddToBasket()
  return (
    <div className={styles.actions}>
      <button className={styles.addCartBtn}
        onClick={(e) => addToBasket(e, product)}
      ><ShoppingCart size={20} /> ADD TO BAG</button>
  <FavoriteButton product={product} variant="detail" />
    </div>
  )
}
