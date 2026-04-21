"use client";

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
          <span 
            className={styles.upperSubtitle}
              id="hero-subtitle"
          >
            WINTER COLLECTION 2026
          </span>
          
          <h1 
            className={styles.mainTitle}
             id="hero-title"
          >
            THE NEW <br /> FORM
          </h1>

          <div 
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
          </div>
        </div>
      </div>
    </section>
  );
}