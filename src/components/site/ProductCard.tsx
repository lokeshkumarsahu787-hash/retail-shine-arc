import { Link } from "@tanstack/react-router";
import { Heart, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { useShop } from "@/store/shop";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useShop((s) => s.add);
  const toggleWish = useShop((s) => s.toggleWish);
  const wished = useShop((s) => s.wishlist.includes(product.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <Link to="/products/$id" params={{ id: product.id }} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-surface aspect-square">
          <img src={product.image} alt={product.name} loading="lazy" width={1024} height={1024}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {product.badge && (
            <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-foreground text-background px-2 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          {product.stock < 10 && (
            <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest bg-background/90 px-2 py-1 rounded-full">
              Low stock
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggleWish(product.id); }}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-background/90 hover:bg-background hover-lift"
            aria-label="Wishlist"
          >
            <Heart className={`size-4 ${wished ? "fill-accent text-accent" : ""}`} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); add(product.id); toast.success(`${product.name} added to cart`); }}
            className="absolute bottom-3 left-3 p-2 rounded-full bg-foreground text-background opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
            aria-label="Add to cart"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">${product.price}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <Star className="size-3 fill-current" /> {product.rating}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
