import styles from './BentoGrid.module.css'

export default function BentoGrid() {
  return (
    <div className={styles.gridWrap}>

      <div className={`${styles.card} ${styles.cardLeft}`}>
        <div className={styles.overlay} />
        <div className={styles.cardContent}>
          <span className={styles.labelTag}>Collection</span>
          <h2 className={styles.cardTitle}>Archive</h2>
          <p className={styles.cardSubtitle}>
            Exploring the foundational pieces of our collection since inception.
          </p>
        </div>
      </div>

      <div className={`${styles.card} ${styles.cardTopRight}`}>
        <div className={styles.overlay} />
        <span className={styles.arrowIcon}>↗</span>
        <div className={styles.cardContent}>
          <p className={styles.boutiqueTitle}>Boutique Exclusive</p>
        </div>
      </div>

      <div className={styles.bottomRightRow}>

        <div className={`${styles.card} ${styles.cardJournal}`}>
          <div className={styles.overlay} />
          <div className={styles.cardContent}>
            <p className={styles.journalLabel}>Journal</p>
            <p className={styles.journalTitle}>Material Focus</p>
          </div>
        </div>

        <div className={styles.cardDispatch}>
          <svg className={styles.truckIcon} viewBox="0 0 36 26" fill="none">
            <rect x="0" y="4" width="22" height="14" rx="2" fill="rgba(255,255,255,0.85)" />
            <path d="M22 8h5l4 5v5h-9V8z" fill="rgba(255,255,255,0.85)" />
            <circle cx="7" cy="22" r="3" fill="rgba(255,255,255,0.85)" />
            <circle cx="28" cy="22" r="3" fill="rgba(255,255,255,0.85)" />
          </svg>

          <div className={styles.cardContentCenter}>
            <p className={styles.dispatchTitle}>Global Dispatch</p>
            <p className={styles.dispatchSub}>Secured & Insured</p>
          </div>
        </div>

      </div>
    </div>
  )
}