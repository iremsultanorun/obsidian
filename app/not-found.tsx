"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.content}
      >
        <h1 className={styles.errorCode}>404</h1>
        <div className={styles.line}></div>
        <h2 className={styles.title}>LOST IN DARKNESS</h2>
        <p className={styles.description}>
          The page you are looking for has been archived or does not exist yet.
        </p>
        <Link href="/" className={styles.backBtn}>
          RETURN TO BOUTIQUE
        </Link>
      </motion.div>
    </div>
  );
}