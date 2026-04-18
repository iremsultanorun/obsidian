"use client";

import { useBasketStore } from "@/store/useBasketStore";
import BasketModal from "./basket/BasketModal";
import SearchModal from "./search/SearchModal";

export default function ModalManager() {
    const activeModal = useBasketStore((state) => state.activeModal);
    if (!activeModal) return null;
    return (
        <>
            {activeModal === 'basket' && <BasketModal />}
            {activeModal === 'search' && <SearchModal />}
        </>
    );
}