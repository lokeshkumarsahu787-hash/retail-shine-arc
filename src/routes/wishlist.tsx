import { createFileRoute, Link } from "@tanstack/react-router";
import { useShop } from "@/store/shop";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/wishlist")({
  component: Wishlist,
  head: () => ({ meta: [{ title: "Wishlist — Lumen" }] }),
});

function Wishlist() {
  const ids = useShop((s) => s.wishlist);
  const items = products.filter((p) => ids.includes(p.id));
  return (
    <div className="container-x py-12">
      <h1 className="font-display text-4xl md:text-5xl mb-10">Wishlist</h1>
      {items.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          Nothing saved yet. <Link to="/products" className="text-foreground underline">Browse products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
