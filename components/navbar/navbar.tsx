"use client";

import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styles from "./Navbar.module.css"; 
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavLink {
  name: string,
  href: string
}
const navLinks: NavLink[] = [
  { name: "BOUTIQUE", href: "/" },
  { name: "ARCHIVE", href: "/archive" },
  { name: "EDITORIAL", href: "/editorial" },
  { name: "CURATED", href: "/curated" },
];

const containerVariants: Variants = {
  hover: {
    transition: { staggerChildren: 0.04 }
  }
};

const letterVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: [0, 4, -4, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

export default function Navbar() {

  const path = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarLogo}>
        <Link href="/">OBSIDYEN</Link>
      </div>

      <ul className={styles.navbarLinks}>
        {navLinks.map((link) => (
          <motion.li
            key={link.name}
            variants={containerVariants}
            initial="initial"
            whileHover="hover"
            className={styles.navItem}
          >
            <Link href={link.href} className={`${styles.navLink} ${path === link.href ? styles.activeLink : ""}`}>
              {link.name.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className={styles.animLetter}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </Link>
          </motion.li>
        ))}
      </ul>

      <div className={styles.navbarIcons}>
        <button className={styles.iconButton} onClick={() => setIsSearchOpen(true)}
          aria-label="Open search">
          <Search size={22} strokeWidth={1.5} />
        </button>
        <button className={styles.iconButton} aria-label="View favorites">
          <Heart size={22} strokeWidth={1.5} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.cartButton}`}
          aria-label="View shopping bag"
        >
          <ShoppingBag size={22} strokeWidth={1.5} />
          <span className={styles.cartBadge}>0</span>
        </button>
        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 0% 100%)", opacity: 0 }}
            animate={{ clipPath: "circle(150% at 0% 100%)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at 0% 100%)", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.mobileMenu}
          >
            <ul className={styles.mobileLinks}>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link href={link.href} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}