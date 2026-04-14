"use client";

import { useBasketStore } from "@/store/useBasketStore";
import { motion, AnimatePresence, easeIn } from "framer-motion";
import Image from "next/image";

export default function FlyingAnimation() {
  const { flyingImage, setFlyingImage } = useBasketStore();
  
  const getTargetPosition = () => {
    const basketIcon = document.getElementById("basket-icon");
    if (basketIcon) {
      const rect = basketIcon.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
    return { x: 0, y: 0 };
  };

  return (
    <AnimatePresence>
      {flyingImage && (
        <motion.div
          key="flying-image"
          initial={{
            position: "fixed",
            top: flyingImage.startPos.y,
            left: flyingImage.startPos.x,
            width: 100,
            height: 100,
            x: "-50%",
            y: "-50%",
            zIndex: 10000,
            borderRadius: "12px",
            overflow: "hidden",
            opacity: 1,
            scale: 3,
          }}
          animate={{
            top: getTargetPosition().y,
            left: getTargetPosition().x,
            width: 15,
            height: 15,
            opacity: 0.2,
            scale: 0.1,
          }}
          transition={{
            duration: .8,
            ease:easeIn,
          }}
          onAnimationComplete={() => setFlyingImage(null)}
          style={{ pointerEvents: "none" }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={flyingImage.src}
              alt="flying"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}