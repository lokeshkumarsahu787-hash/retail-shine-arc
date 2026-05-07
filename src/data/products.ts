import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  description: string;
  badge?: string;
};

export const categories = ["All", "Bags", "Home", "Audio", "Apparel", "Accessories"] as const;

export const products: Product[] = [
  { id: "1", name: "Atelier Tote", price: 189, category: "Bags", image: p1, rating: 4.8, stock: 12, description: "Hand-stitched full-grain leather tote, designed for everyday elegance.", badge: "New" },
  { id: "2", name: "Morning Mug", price: 28, category: "Home", image: p2, rating: 4.6, stock: 40, description: "Stoneware mug with a satin matte glaze. Holds 12oz of warmth." },
  { id: "3", name: "Quietude Headphones", price: 349, category: "Audio", image: p3, rating: 4.9, stock: 7, description: "Active noise cancellation, 40h battery, butter-soft memory foam.", badge: "Bestseller" },
  { id: "4", name: "Linen Overshirt", price: 145, category: "Apparel", image: p4, rating: 4.7, stock: 18, description: "Heavyweight European linen, garment-washed for a lived-in feel." },
  { id: "5", name: "Heritage Watch", price: 425, category: "Accessories", image: p5, rating: 4.8, stock: 5, description: "Swiss movement, sapphire crystal, vegetable-tanned strap." },
  { id: "6", name: "Cedarwood Candle", price: 48, category: "Home", image: p6, rating: 4.5, stock: 30, description: "Coconut wax, 60-hour burn. Notes of cedar, smoked vanilla, amber." },
  { id: "7", name: "Bifold Wallet", price: 95, category: "Accessories", image: p7, rating: 4.7, stock: 22, description: "Slim bifold in vegetable-tanned leather. Six card slots, two billfolds." },
  { id: "8", name: "Eclipse Sunglasses", price: 165, category: "Accessories", image: p8, rating: 4.6, stock: 14, description: "Italian acetate frames, polarized lenses, lifetime hinges." },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
