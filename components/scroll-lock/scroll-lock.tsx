"use client"

import { useBasketStore } from "@/store/useBasketStore"
import { useEffect } from "react"


export default function ScrollLock() {
  const { activeModal } = useBasketStore()
  useEffect(() => {
      console.log("activeModal değişti:", activeModal)
    if (activeModal !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "scroll"
    }
    return () => {
      document.body.style.overflow = "scroll"
    }
  }, [activeModal])

  return null
}