import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  originalPrice: number;
  discountRate: number;
  quantity: number;
}

interface CartStore {
  ids: string[];
  byId: Record<string, CartItem>;
  totalCount: number;

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  ids: [],
  byId: {},
  totalCount: 0,

  addItem: (item) =>
    set((state) => {
      const existing = state.byId[item.id];
      if (existing) {
        const newQty = existing.quantity + item.quantity;
        return {
          byId: { ...state.byId, [item.id]: { ...existing, quantity: newQty } },
          totalCount: state.totalCount + item.quantity,
        };
      }
      return {
        ids: [...state.ids, item.id],
        byId: { ...state.byId, [item.id]: item },
        totalCount: state.totalCount + item.quantity,
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const item = state.byId[id];
      if (!item) return state;
      const { [id]: _, ...rest } = state.byId;
      return {
        ids: state.ids.filter((i) => i !== id),
        byId: rest,
        totalCount: state.totalCount - item.quantity,
      };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const item = state.byId[id];
      if (!item) return state;
      return {
        byId: { ...state.byId, [id]: { ...item, quantity } },
        totalCount: state.totalCount - item.quantity + quantity,
      };
    }),

  clearCart: () => set({ ids: [], byId: {}, totalCount: 0 }),
}));
