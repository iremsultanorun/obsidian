"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { IProduct } from "@/types/product";
import { useAddToFavorite } from "@/hooks/useAddToFavorite";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import styles from "./FavoriteButton.module.css";
import { useSyncExternalStore } from "react";
const MotionHeart = motion(Heart);

export default function FavoriteButton({ product, variant = "card" }: { product: IProduct, variant?: "card" | "detail" }) {
  const toggleFavorite = useAddToFavorite();

  const favorited = useSyncExternalStore(
    useFavoriteStore.subscribe,
    () => useFavoriteStore.getState().isFavorite(product.id),
    () => false 
  );
  const buttonClass = variant === "detail" ? styles.wishlistBtn : styles.iconBtn;

  return (
    <button
      className={`${buttonClass} ${favorited ? styles.activeFavorite : ""}`}
      aria-label="Add to wishlist"
      onClick={(e) => toggleFavorite(e, product, favorited)} 
    >
      <MotionHeart
        size={variant === "detail" ? 22 : 18}
        fill={favorited ? "currentColor" : "none"}
        animate={favorited ? {
          scale: [1, 1.4, 1],
          rotate: [0, 15, -15, 0] 
        } : {
          scale: 1,
          rotate: 0
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </button>
  );
}