
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.left}>
          OBSIDIAN
        </div>

        <div className={styles.center}>
          <Link href="/privacy-policy" className={styles.footerLink}>
            PRIVACY POLICY
          </Link>
          <Link href="/terms-of-service" className={styles.footerLink}>
            TERMS OF SERVICE
          </Link>
          <Link href="/contact" className={styles.footerLink}>
            CONTACT
          </Link>
          <Link href="/shipping" className={styles.footerLink}>
            SHIPPING
          </Link>
        </div>

        <div className={styles.right}>
          © 2024 OBSIDIAN. ALL RIGHTS RESERVED.
        </div>

      </div>


    </footer>
  );
}