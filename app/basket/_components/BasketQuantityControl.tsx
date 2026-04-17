"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import styles from "./BasketQuantityControl.module.css";
import { useBasketStore } from "@/store/useBasketStore";
import { ICartItem } from "@/store/useBasketStore";

interface Props {
  item: ICartItem;
}

export default function BasketQuantityControl({ item }: Props) {
  const { addToBasket, decreaseQuantity, removeFromBasket } = useBasketStore();

  return (
    <div className={styles.quantitySelector}>
      <button 
        className={styles.qtyBtn} 
        onClick={() => decreaseQuantity(item.id)}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      
      <span className={styles.quantityText}>{item.quantity}</span>
      
      <button 
        className={styles.qtyBtn} 
        onClick={() => addToBasket(item)}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
      
      <button 
        className={`${styles.qtyBtn} ${styles.removeBtn}`} 
        onClick={() => removeFromBasket(item.id)}
        aria-label="Remove item"
      >
        <Trash2 size={14} />
      </button>
    </div>

  );
}