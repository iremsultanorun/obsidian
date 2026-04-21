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
      type="button"
        className={styles.qtyBtn} 
        disabled={item.quantity <= 1}
        onClick={() => decreaseQuantity(item.id)}
        aria-label={`Decrease quantity of ${item.title}`}
      >
        <Minus size={14} />
      </button>
      
      <span className={styles.quantityText}>{item.quantity}</span>
      
      <button 
      type="button"
        className={styles.qtyBtn} 
        onClick={(e) => {
          e.stopPropagation()
          addToBasket(item)
        }}
        aria-label={`Increase quantity of ${item.title}`}
      >
        <Plus size={14} />
      </button>
      
      <button 
      type="button"
        className={`${styles.qtyBtn} ${styles.removeBtn}`} 
        onClick={() => removeFromBasket(item.id)}
        aria-label={`Remove ${item.title} from basket`}
      >
        <Trash2 size={14} />
      </button>
    </div>

  );
}