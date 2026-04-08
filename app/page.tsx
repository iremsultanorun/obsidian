import Hero from "./_components/hero/Hero";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero/>
      </main>
    </div>
  );
}
