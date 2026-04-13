import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Sol */}
        <div className={styles.left}>
          OBSIDIAN
        </div>

        {/* Orta */}
        <div className={styles.center}>
          <a href="#">PRIVACY POLICY</a>
          <a href="#">TERMS OF SERVICE</a>
          <a href="#">CONTACT</a>
          <a href="#">SHIPPING</a>
        </div>

        {/* Sağ */}
        <div className={styles.right}>
          © 2024 OBSIDIAN. ALL RIGHTS RESERVED.
        </div>

      </div>

   
    </footer>
  );
}