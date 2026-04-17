"use client";

import { useBasketStore } from "@/store/useBasketStore";
import BasketModal from "./basket/BasketModal";
// import SearchModal from "../search/SearchModal"; // Gelecekte eklenecek

export default function ModalManager() {
    const activeModal = useBasketStore((state) => state.activeModal);

    if (!activeModal) return null;
console.log(activeModal)
    return (
        <>
            {activeModal === 'basket' && <BasketModal />}
            {/* {activeModal === 'search' && <SearchModal />} */}
        </>
    );
}