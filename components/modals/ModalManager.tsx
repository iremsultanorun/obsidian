"use client";
import BasketModal from "./basket/BasketModal";
import SearchModal from "./search/SearchModal";
import { useUIStore } from "@/store/useUIStore";

export default function ModalManager() {
    const activeModal = useUIStore((state) => state.activeModal);
    if (!activeModal) return null;
    return (
        <>
            {activeModal === 'basket' && <BasketModal />}
            {activeModal === 'search' && <SearchModal />}
        </>
    );
}