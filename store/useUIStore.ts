import { create } from "zustand";


type ModalType = 'basket' | 'search' | 'menu' | null;

interface UIState {
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  toggleModal: (modal: ModalType) => void;
  closeAllModals: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeModal: null,
  setActiveModal: (modal) => set({ activeModal: modal }),
  toggleModal: (modal) => set((state) => ({ 
    activeModal: state.activeModal === modal ? null : modal 
  })),
  closeAllModals: () => set({ activeModal: null }),
}));