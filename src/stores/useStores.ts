import cachedKeys from "@/consts/cachedKeys";
import { ProductDetail } from "@/services/modules/product/interfaces/product";
import { create } from "zustand";

type AllQueryKeys = keyof typeof cachedKeys;

const useStore = create<{ [key: string]: any }>((set) => ({
  state: {},
  save: (key: AllQueryKeys, value: any) => {
    return set((rootState) => ({
      state: {
        ...rootState.state,
        [key]: value,
      },
    }));
  },
}));

export const useSave = () => useStore((rootState) => rootState.save);
export const useGet = (key: AllQueryKeys) =>
  useStore((rootState) => rootState.state?.[key]);
export default useStore;

type CartState = {
  items: ProductDetail[];
  addItem: (item: ProductDetail) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  itemExists: (id: string | undefined) => boolean;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  // Add item to cart
  addItem: (item, quantity = 1) =>
    set((state) => {
      const exists = state.items.some((i) => i.Id === item.Id);
      return {
        items: exists
          ? state.items.map((i) =>
              i.Id === item.Id ? { ...i, Quantity: i.Quantity + quantity } : i
            )
          : [...state.items, { ...item, Quantity: quantity }],
      };
    }),
  // Remove item from cart
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.Id !== id),
    })),

  // Update item quantity
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.Id === id ? { ...item, quantity } : item
      ),
    })),

  // Clear cart
  clearCart: () => set({ items: [] }),

  // Get cart total
  getCartTotal: () =>
    get().items.reduce((total, item) => total + item.Price * item.Quantity, 0),

  // Get total item count in cart
  getItemCount: () =>
    get().items.reduce((count, item) => count + item.Quantity, 0),

  // Check if item exists in cart
  itemExists: (id) => get().items.some((item) => item.Id === id),
}));
