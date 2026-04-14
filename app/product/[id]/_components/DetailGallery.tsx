"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./DetailGallery.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  images: string[];
  title: string;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export default function ProductGallery({ images, title }: Props) {
  const [[selectedImg, direction], setSelectedImg] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    let nextIndex = selectedImg + newDirection;
    if (nextIndex < 0) nextIndex = images.length - 1;
    if (nextIndex >= images.length) nextIndex = 0;
    setSelectedImg([nextIndex, newDirection]);
  };

  return (
    <div className={styles.visualSection}>
      <div className={styles.mainImageWrapper}>

        {images.length > 1 && (
          <div className={styles.controls}>
            <button className={`${styles.navBtn} ${styles.prev}`} onClick={() => paginate(-1)}>
              <ChevronLeft size={24} />
            </button>
            <button className={`${styles.navBtn} ${styles.next}`} onClick={() => paginate(1)}>
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className={styles.sliderContainer}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={selectedImg}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}

              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;

                if (swipe < -5000) paginate(1);
                else if (swipe > 5000) paginate(-1);
              }}

              className={styles.animatedImageContainer}
            >
              <Image
                src={images[selectedImg]}
                alt={title}
                fill
                className={styles.mainImage}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className={styles.thumbnailGrid}>
        {images.slice(0, 5).map((img, index) => (
          <div
            key={index}
            className={`${styles.thumb} ${selectedImg === index ? styles.activeThumb : ""}`}
            onClick={() => {
              const newDirection = index > selectedImg ? 1 : -1;
              setSelectedImg([index, newDirection]);
            }}
          >
            <Image src={img} alt={`${title} thumb`} fill sizes="100px" />
          </div>
        ))}
      </div>
    </div>
  );
}