"use client";

import { useRef, useState, useEffect, useMemo,memo } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product";
import styles from "./ProductCard.module.css";
import { ShoppingCart, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useAddToBasket } from "@/hooks/useAddToBasket";
import FavoriteButton from "@/components/common/FavoriteButton/FavoriteButton";

interface ProductCardProps {
  product: IProduct;
  priority?: boolean;
}

 function ProductCard({ product, priority = false }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const addToBasket = useAddToBasket();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sliderX = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 80, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 80, damping: 15 });

  const cubeRotation = useTransform(sliderX, [0, 200], [0, -360]);
  const tiltX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const tiltY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const detailsZ = (!isMobile && isHovered && !isClicked) ? 50 : 2;

  const getSceneTransform = useMemo(() => {
    if (isMobile) return "none";
    if (isClicked) return "translateY(-100px) rotateX(310deg) translateZ(150px)";
    if (isHovered) return "translateZ(10px)";
    return "translateZ(0px)";
  }, [isMobile, isClicked, isHovered]);

  const goNext = () => setCurrentImgIndex((prev) => (prev + 1) % Math.min(product.images.length, 4));
  const goPrev = () => setCurrentImgIndex((prev) => (prev - 1 + Math.min(product.images.length, 4)) % Math.min(product.images.length, 4));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current || isClicked) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.cardContainer} ${isClicked ? styles.cardClicked : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false); }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
    >
      <motion.div
        className={styles.card}
        style={{
          rotateX: isMobile ? 0 : (isClicked ? 55 : tiltX),
          rotateY: isMobile ? 0 : (isClicked ? 0 : tiltY),
          transformStyle: isMobile ? "flat" : "preserve-3d"
        }}
        transition={isHovered || isClicked ? { type: "spring", stiffness: 100, damping: 20 } : { duration: 0 }}
      >
        {!isMobile && (
          <AnimatePresence>
            {isHovered && !isClicked && (
              <motion.div
                className={styles.clickHint}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                style={{ translateZ: 60 }} 
                onClick={(e) => {
                  e.stopPropagation(); 
                  setIsClicked(true);
                }}
                >
      
                  </motion.div>
            )}
          </AnimatePresence>
        )}

        <motion.div
          ref={galleryRef}
          className={styles.cubeScene}
          animate={{ transform: getSceneTransform }} 
          initial={false}
        >
          {!isClicked ? (
            <motion.div className={styles.standardSlider}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentImgIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.standardSlide}
                >
                  <Image
                    src={product.images[currentImgIndex]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 300px"
                    className={styles.cubeImage}
                    priority={priority || currentImgIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
              
              {!isMobile && product.images.length > 1 && (
                <div className={styles.arrowContainer}>
                  <button className={styles.arrowBtn} onClick={(e) => { e.stopPropagation(); goPrev(); }}><ChevronLeft size={18} /></button>
                  <button className={styles.arrowBtn} onClick={(e) => { e.stopPropagation(); goNext(); }}><ChevronRight size={18} /></button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              className={styles.cube}
              style={{ rotateY: cubeRotation, transformStyle: "preserve-3d" }}
            >
              {[0, 90, 180, 270].map((angle, index) => (
                <div
                  key={angle}
                  className={styles.cubeFace}
                  style={{ transform: `rotateY(${angle}deg) translateZ(100px)` }}
                >
                  <Image
                    src={product.images[index % product.images.length]}
                    alt="face"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.cubeImage}
                  />
                </div>
              ))}
            </motion.div>
          )}

          <AnimatePresence>
            {isClicked && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsClicked(false);
                }}
                className={styles.exitBtn}
                style={{ translateZ: 200 }}
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {isClicked && (
          <div className={styles.sliderContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.sliderLine} />
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 200 }}
              dragElastic={0}
              style={{ x: sliderX }}
              className={styles.sliderHandle}
            />
          </div>
        )}

        <motion.div className={styles.details} style={{ translateZ: detailsZ }}>
          <div className={styles.productInfo}>
            <span className={styles.category}>{product.category}</span>
            <h3 className={styles.title}>{product.title}</h3>
            <p className={styles.description}>{product.description}</p>
            <span className={styles.price}>{product.price}€</span>
          </div>

          <div className={styles.actionGroup}>
            <Link href={`/product/${product.id}`} className={styles.detailBtn}>DETAILS</Link>
            <div className={styles.iconActions}>
              <FavoriteButton product={product} variant="card" />
              <button className={styles.iconBtn} onClick={(e) => addToBasket(e, product, undefined, galleryRef)}>
                <ShoppingCart size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
export default memo(ProductCard)