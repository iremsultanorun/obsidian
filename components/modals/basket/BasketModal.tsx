"use client";

import { useBasketStore } from "@/store/useBasketStore";
import { motion, AnimatePresence } from "framer-motion";
import { X} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./BasketModal.module.css";
import BasketQuantityControl from "@/app/basket/_components/BasketQuantityControl";

export default function BasketModal() {
  const { items, activeModal, setActiveModal} = useBasketStore();
  
  const isOpen = activeModal === "basket";
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className={styles.overlay} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          />

          <motion.div 
            className={styles.modal}
            initial={{ x: "110%" }}
            animate={{ x: 0 }}
            exit={{ x: "110%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >

            <div className={styles.header}>
              <h2>Your Basket</h2>
              <button onClick={() => setActiveModal(null)} className={styles.closeBtn}>
                <X size={20} color="#888" />
              </button>
            </div>

            <div className={styles.content}>
              {items.length === 0 ? (
                <div style={{color: "#888", textAlign: 'center', marginTop: '40px'}}>Your basket is empty.</div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <Image src={item.images[0]} alt={item.title} fill objectFit="cover" />
                    </div>
                    <div className={styles.itemDetails}>
                      <h4>{item.title}</h4>
                      <p>{item.category}</p>
                      
                      <div className={styles.itemPriceRow}>
                        <span className={styles.price}>${item.price.toFixed(2)}</span>
                        
                       <BasketQuantityControl item={item}  />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.totalRow}>
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
    <Link href="/basket" style={{ textDecoration: 'none' }}>
      <button 
        className={styles.checkoutBtn} 
        onClick={() => setActiveModal(null)} 
      >
        CHECKOUT NOW
      </button>
    </Link>
                <div style={{display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '15px', fontSize: '10px', color: '#555', letterSpacing: '1px'}}>
                   <span>SHIPPING</span>
                   <span>TAX POLICY</span>
                   <span>HELP</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}