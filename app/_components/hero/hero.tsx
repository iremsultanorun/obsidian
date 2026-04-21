"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroContainer}   aria-labelledby="hero-title"
      aria-describedby="hero-subtitle"
    >
      <div className={styles.circleContainer}>
        <div className={styles.bigCircle}
          aria-hidden="true"
        ></div>
      </div>

      <div className={styles.content}>
        <div className={styles.textWrapper}>
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.upperSubtitle}
              id="hero-subtitle"
          >
            WINTER COLLECTION 2026
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={styles.mainTitle}
             id="hero-title"
          >
            THE NEW <br /> FORM
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={styles.actionArea}
          >
            <p className={styles.description}>
              Redefining silhouettes <br /> for the modern era.
            </p>
            
            <Link 
              href="/#products-section" 
              className={styles.exploreBtn}
              aria-label="Explore winter collection 2026 products"
            >
              EXPLORE NOW
              <span className={styles.btnLine}   aria-hidden="true"></span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}