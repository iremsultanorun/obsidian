"use client";

import { useNotificationStore } from "@/store/useNotificationStore";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import styles from "./GlobalAlert.module.css";

export default function GlobalAlert() {
  const { message, type, isVisible, hideNotification } = useNotificationStore();

  const icons = {
    error: <AlertCircle size={18} color="#ff4d4d" />,
    success: <CheckCircle2 size={18} color="#4ade80" />,
    info: <Info size={18} color="#60a5fa" />,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%" }} 
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          className={styles.alertContainer}
          onClick={hideNotification}
        >
          {icons[type]}
          
          <span className={styles.message}>
            {message}
          </span>
          
          <X size={14} className={styles.closeIcon} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}