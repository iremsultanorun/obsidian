"use client"

import { useUIStore } from "@/store/useUIStore"
import { useEffect } from "react"


export default function ScrollLock() {
  const { activeModal } = useUIStore()
  useEffect(() => {
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