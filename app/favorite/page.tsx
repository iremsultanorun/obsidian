"use client";

import { useFavoriteStore } from "@/store/useFavoriteStore";
import styles from "./favorites.module.css";
import { X } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/products/product-card/ProductCard";
export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavoriteStore();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Favorites</h1>
        <p className={styles.subtitle}>CURATED SELECTION • {favorites.length.toString().padStart(2, '0')} ITEMS</p>
      </header>

      <ul className={styles.grid} aria-label="Favorite products">
        {favorites.map((product) => (
          <li key={product.id} className={styles.cardWrapper}>
            <button 
              className={styles.removeBtn} 
              onClick={() => removeFromFavorites(product.id)}
              aria-label={`Remove ${product.title} from favorites list`}
            >
              <X size={18} aria-hidden="true" focusable="false" />
            </button>
            <ProductCard product={product}  />
          </li>
        ))}
      </ul>

      <section className={styles.curatedSection}>
        <div className={styles.curatedHeader}>
          <div>
            <h2 className={styles.curatedTitle}>Curated for You</h2>
            <p className={styles.curatedDesc}>
              Based on your recent aesthetic choices, our editors have selected these pieces to complete your Obsidian wardrobe.
            </p>
          </div>
          <Link href="/#products-section" className={styles.exploreLink}>EXPLORE FULL BOUTIQUE</Link>
        </div>
      </section>
    </div>
  );
}