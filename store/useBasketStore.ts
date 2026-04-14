import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "@/types/product";

export interface ICartItem extends IProduct {
    quantity: number;
}

interface BasketState {
    items: ICartItem[];
    flyingImage: { src: string; startPos: { x: number; y: number } } | null;
    addToBasket: (product: IProduct) => void;
    removeFromBasket: (productId: number) => void;
    setFlyingImage: (data: { src: string; startPos: { x: number; y: number } } | null) => void;
}

export const useBasketStore = create<BasketState>()(
    persist(
        (set) => ({
            items: [],
            flyingImage: null,
            addToBasket: (product) =>
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === product.id);

                    if (existingItem) {
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

            removeFromBasket: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                })),
            setFlyingImage: (data) => set({ flyingImage: data }),
        }),

        {
            name: "basket",
        }
    )
);