"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import styles from "./SearchModal.module.css";
import ProductCard from "@/components/products/product-card/ProductCard";
import { IProduct } from "@/types/product";
import { useBasketStore } from "@/store/useBasketStore";

export default function SearchModal() {
  const { setActiveModal } = useBasketStore();
  
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
      })
  }, []);
  const results = useMemo(() => {
    if (query.trim() === "") return [];
  
    return allProducts.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allProducts]);

  const handleClose = () => {
    setActiveModal(null);
  };

  return (
    <motion.div 
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.modalContent}>
        <div className={styles.searchHeader}>
          <Search className={styles.searchIcon} size={24} strokeWidth={1.5} />
          <input
            autoFocus
            type="text"
            placeholder="Search for collections, products, or archive..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={handleClose} className={styles.closeBtn}>
            <X className={styles.closeIcon} size={28} strokeWidth={1.2} />
          </button>
        </div>

        <div className={styles.resultsArea}>
          {query === "" ? (
            <div className={styles.trending}>
              <h4>TRENDING SEARCHES</h4>
              <div className={styles.pills}>
                {["Powder", "Annibale Colombo", "Lipstick", "Mascara"].map(p => (
                  <span 
                    key={p} 
                    className={styles.pill} 
                    onClick={() => setQuery(p)}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              <div className={styles.gridHeader}>
                <h3>Results</h3>
                <span>{results.length} RESULTS</span>
              </div>
              
              {results.length > 0 ? (
                <div className={styles.grid}>
                  {results.map((product) => (
                    <div key={product.id} onClick={handleClose}>
                       <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noResult}>{
                  `No products found for ${query}`
                }</p>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}