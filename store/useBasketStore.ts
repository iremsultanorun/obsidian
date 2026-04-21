import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "@/types/product";
import { useNotificationStore } from "./useNotificationStore";

export interface ICartItem extends IProduct {
    quantity: number;
}
type ModalType = 'basket' | 'search' | 'menu' | null;
interface BasketState {
    items: ICartItem[];
    activeModal: ModalType;
    flyingImage: { src: string; startPos: { x: number; y: number } } | null;
    mainImagePos: { left: number; top: number; width: number; height: number } | null;
    addToBasket: (product: IProduct) => void;
    decreaseQuantity: (productId: number) => void;
    removeFromBasket: (productId: number) => void;
    setFlyingImage: (data: { src: string; startPos: { x: number; y: number } } | null) => void;
    setActiveModal: (modal: ModalType) => void;
    toggleModal: (modal: ModalType) => void;
    closeAllModals: () => void;
    setMainImagePos: (pos: { left: number; top: number; width: number; height: number } | null) => void;
}

export const useBasketStore = create<BasketState>()(
    persist(
        (set) => ({
            items: [],
            flyingImage: null,
            activeModal: null,
            mainImagePos: null,
            setActiveModal: (modal) => set({ activeModal: modal }),
            closeAllModals: () => set({ activeModal: null }),
            toggleModal: (modal) => set((state) => ({ 
                activeModal: state.activeModal === modal ? null : modal 
            })),
            addToBasket: (product) =>
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === product.id);

                    if (existingItem) {
                        if (existingItem.quantity >= 10) {
                            state.flyingImage=null
                            useNotificationStore.getState().showNotification("Maksimum 10 adet ekleyebilirsiniz.", "error");
                            return state
                        }
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }
                    return { items: [...state.items, { ...product, quantity: 1 }] };
                }),
            decreaseQuantity: (productId) => set((state) => ({
                items: state.items.map(i =>
                    i.id === productId && i.quantity > 1
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                )
            })),

            removeFromBasket: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                })),
            setFlyingImage: (data) => set({ flyingImage: data }),
            setMainImagePos: (pos) => set({ mainImagePos: pos }),
        }),

        {
            name: "basket",
        }
    )
);