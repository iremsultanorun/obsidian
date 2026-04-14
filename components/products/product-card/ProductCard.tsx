"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product";
import styles from "./ProductCard.module.css";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sliderX = useMotionValue(0);
  const cubeRotation = useTransform(sliderX, [0, 200], [0, -360]);

  const mouseX = useSpring(x, { stiffness: 80, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 80, damping: 15 });

  const tiltX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const tiltY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const detailsZ = (isHovered && !isClicked) ? 50 : 2;
  const getSceneTransform = () => {

    if (isClicked) return "translateY(-100px) rotateX(310deg) translateZ(150px)";
    
    if ((isHovered&&!isClicked)) return "translateZ(10px)";
    
    return "translateY(0px) rotateX(0deg) translateZ(0px)";
    
    };
  
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % Math.min(product.images.length, 4));
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + Math.min(product.images.length, 4)) % Math.min(product.images.length, 4));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    x.set((e.clientX - rect.left) / width - 0.5);
    y.set((e.clientY - rect.top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.cardContainer} ${isClicked ? styles.cardClicked : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}

    >
  
      <motion.div
        className={`${styles.card}`}
        style={{
          rotateX: isClicked ? 55 : tiltX,
          rotateY: isClicked ? 0 : tiltY,
        
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >

        <AnimatePresence>
  {isHovered && !isClicked && (
    <motion.div
      onClick={(e) => {
        e.stopPropagation(); 
        if (window.innerWidth < 1024) return;
        setIsClicked(true);
      }}
      className={styles.clickHint}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.1 }}
      style={{ translateZ: 60 }}

    >

    </motion.div>
  )}
</AnimatePresence>

        <motion.div
          className={styles.cubeScene}
          animate={{ transform: getSceneTransform() }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
         
        >
          {!isClicked ? (
            <div className={styles.standardSlider}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImgIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={styles.standardSlide}
                >
                  <Image
                    src={product.images[currentImgIndex]}
                    alt={product.title}
                    fill
                    sizes="200px"
                    className={styles.cubeImage}
                  />
                </motion.div>
              </AnimatePresence>
              
              {
                
              (product.images.length>1)&& (
                <div className={styles.arrowContainer}>
                  <button className={styles.arrowBtn} onClick={prevImg}><ChevronLeft size={20}/></button>
                  <button className={styles.arrowBtn} onClick={nextImg}><ChevronRight size={20}/></button>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              className={styles.cube}
              style={{
                rotateY: cubeRotation,
                transformStyle: "preserve-3d",
              }}
            >
              {[0, 90, 180, 270].map((angle, index) => (
                <div
                  key={angle}
                  className={styles.cubeFace}
                  style={{ transform: `rotateY(${angle}deg) translateZ(100px)` }}
                >
                  <Image
                    src={product.images[index % product.images.length]}
                    alt="p"
                    fill
                    sizes="200px"
                    className={styles.cubeImage}
                  />
                </div>
              ))}
            </motion.div>
          )}
<AnimatePresence>
  {isClicked && (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      onClick={() => setIsClicked(false)}
      className={styles.exitBtn}
      style={{ translateZ: 150 }}
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

        <motion.div
          className={styles.details}
          style={{ translateZ: detailsZ }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className={styles.productInfo}>
            <span className={styles.category}>{product?.category || product.category}</span>
            <h3 className={styles.title}>{product.title}</h3>
            <p className={styles.description}>{product.description}</p>
            <span className={styles.price}>{product.price}€</span>
          </div>

          <div className={styles.actionGroup}>
            <Link href={`/product/${product.id}`} className={styles.detailBtn}>
              DETAILS
            </Link>
            <div className={styles.iconActions}>
            <button
                className={styles.iconBtn}
                aria-label="Back"
              >
                <Heart size={18} />

              </button>
              <button
               className={styles.iconBtn} aria-label="Add to cart"
              >
                <ShoppingCart size={18} />
              </button>
            </div>
            </div>

        </motion.div>
      </motion.div>
    {
      !isClicked?  <div className={styles.glassLayer}>
      <motion.div className={styles.lightReflex} />
    </div>:""
    }
    </div>
  );
}