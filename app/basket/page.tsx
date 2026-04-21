"use client";

import { useBasketStore } from "@/store/useBasketStore";
import Image from "next/image";
import styles from "./BasketPage.module.css";
import Link from "next/link";
import BasketQuantityControl from "./_components/BasketQuantityControl";

export default function BasketPage() {
  const { items } = useBasketStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.08; 
  const total = subtotal + shipping + tax;

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.mainTitle}>Cart</h1>
        <p className={styles.itemCount}>{items.length} ITEMS • CURATED SELECTION</p>
      </header>

      <div className={styles.cartContent}>
        <ul className={styles.itemList}>
          {items.map((item) => (
            <li key={item.id} className={styles.cartCard}>
              <div className={styles.imageWrapper}>
                <Image src={item.images[0]} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.productImg} />
              </div>

              <div className={styles.productInfo}>
                <span className={styles.category}>{item.category}</span>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.shortDesc}>{item.description.slice(0, 60)}...</p>
              </div>
             

              <div className={styles.cardActions}>
              <Link href={`/product/${item.id}`} className={styles.viewDetailBtn}
              aria-label={`View details of ${item.title}`}
              >
                VIEW DETAILS
              </Link>
                <BasketQuantityControl item={item} />
                <span className={styles.itemPrice}>${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            </li>
          ))}

          <div className={styles.continueCard}>
            <p>Curate your collection further</p>
            <Link href="/#products-section" className={styles.continueBtn}>CONTINUE BROWSING</Link>
          </div>
        </ul>

        <aside className={styles.summarySidebar}>
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span className={styles.complimentary}>Complimentary</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className={styles.divider} />

            <div className={styles.totalRow}>
              <span>Total</span>
              <span aria-live="polite" className={styles.totalAmount}>${total.toLocaleString()}</span>
            </div>

            <button   aria-label={`Proceed to checkout. Total amount ${total.toFixed(2)} dollars`} className={styles.checkoutBtn}>PROCEED TO CHECKOUT</button>
            <p className={styles.secureText}>SECURE ENCRYPTED CHECKOUT POWERED BY OBSIDIAN</p>
          </div>
        </aside>
      </div>
    </div>
  );
}