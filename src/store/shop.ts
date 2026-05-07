import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

type CartItem = { id: string; qty: number };

type Address = { name: string; line1: string; city: string; zip: string; country: string };

type User = { email: string; name: string; role: "admin" | "user" };

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  recent: string[];
  user: User | null;
  theme: "light" | "dark";
  addresses: Address[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWish: (id: string) => void;
  pushRecent: (id: string) => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  toggleTheme: () => void;
  addAddress: (a: Address) => void;
};

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      recent: [],
      user: null,
      theme: "light",
      addresses: [],
      add: (id, qty = 1) =>
        set((s) => {
          const ex = s.cart.find((c) => c.id === id);
          if (ex) return { cart: s.cart.map((c) => (c.id === id ? { ...c, qty: c.qty + qty } : c)) };
          return { cart: [...s.cart, { id, qty }] };
        }),
      remove: (id) => set((s) => ({ cart: s.cart.filter((c) => c.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({ cart: s.cart.map((c) => (c.id === id ? { ...c, qty: Math.max(1, qty) } : c)) })),
      clearCart: () => set({ cart: [] }),
      toggleWish: (id) =>
        set((s) => ({
          wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id],
        })),
      pushRecent: (id) =>
        set((s) => ({ recent: [id, ...s.recent.filter((r) => r !== id)].slice(0, 8) })),
      login: (email, name) =>
        set({
          user: {
            email,
            name: name || email.split("@")[0],
            role: email.toLowerCase().includes("admin") ? "admin" : "user",
          },
        }),
      logout: () => set({ user: null }),
      toggleTheme: () => {
        const next = get().theme === "light" ? "dark" : "light";
        if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", next === "dark");
        set({ theme: next });
      },
      addAddress: (a) => set((s) => ({ addresses: [...s.addresses, a] })),
    }),
    { name: "lumen-shop" }
  )
);

export const cartTotals = (cart: CartItem[], all: Product[]) => {
  const items = cart.map((c) => ({ ...c, product: all.find((p) => p.id === c.id)! })).filter((i) => i.product);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 12;
  const tax = +(subtotal * 0.08).toFixed(2);
  return { items, subtotal, shipping, tax, total: subtotal + shipping + tax };
};
