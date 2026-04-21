"use client";

import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./navbar.module.css"; 
import { usePathname } from "next/navigation";
import { useBasketStore } from "@/store/useBasketStore";

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


export default function Navbar() {

  const path = usePathname()

  const { items, setActiveModal,activeModal,toggleModal } = useBasketStore();
  const cartCount = items.length;
  return (
    <nav className={styles.navbarContainer} aria-label="Main navigation">
      <div className={styles.navbarLogo} aria-label="Obsidian home">
        <Link href="/">OBSIDIAN</Link>
      </div>

      <ul className={styles.navbarLinks}>
        {navLinks.map((link) => (
          <li
            key={link.name}
            className={styles.navItem}
          >
            <Link href={link.href} className={`${styles.navLink} ${path === link.href ? styles.activeLink : ""}`} aria-current={path===link.href?"page":undefined}>
            
                 {link.name.split("").map((char, index) => (
                  <span key={index} className={styles.animLetter}>
                    {char}
                  </span>
                ))}
           
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.navbarIcons}>
        <button className={styles.iconButton} onClick={() => setActiveModal("search")}
          aria-label="Open search">
          <Search size={22} strokeWidth={1.5} />
        </button>
   
       <Link href="/favorite"className={styles.iconButton} aria-label="View favorites">
          <Heart size={22} strokeWidth={1.5} />
       </Link>
        <button
          className={`${styles.iconButton} ${styles.cartButton}`}
          aria-label="View shopping bag"
          onClick={() => setActiveModal('basket')}
        >
          <ShoppingBag id="basket-icon" size={22} strokeWidth={1.5} />
          <span className={styles.cartBadge}>
        
          <span className={styles.badge}>{cartCount}</span>
     
            </span>
        </button>
        <button
          className={styles.menuButton}
          onClick={() => toggleModal("menu")}
          aria-label="Toggle menu"
          aria-expanded={activeModal==="menu"}
        >
          <div className={`${styles.hamburger} ${activeModal==="menu" ? styles.open : ""}`}>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      <AnimatePresence>
        {activeModal==="menu" && (
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
                  <Link href={link.href} onClick={() =>setActiveModal(null)}>
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