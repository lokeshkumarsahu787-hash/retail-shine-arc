import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Minus, Plus, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { getProduct, products } from "@/data/products";
import { useShop } from "@/store/shop";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  component: Detail,
  notFoundComponent: () => <div className="container-x py-20 text-center">Product not found.</div>,
});

function Detail() {
  const product = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const add = useShop((s) => s.add);
  const toggleWish = useShop((s) => s.toggleWish);
  const wished = useShop((s) => s.wishlist.includes(product.id));
  const pushRecent = useShop((s) => s.pushRecent);
  const recentIds = useShop((s) => s.recent);

  useEffect(() => { pushRecent(product.id); }, [product.id, pushRecent]);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const recent = recentIds.filter((id) => id !== product.id).map((id) => getProduct(id)!).filter(Boolean).slice(0, 4);

  return (
    <div className="container-x py-12">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-3">
          <div className="overflow-hidden rounded-3xl bg-surface aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[product.image, product.image, product.image, product.image].map((src, i) => (
              <div key={i} className="aspect-square rounded-xl bg-surface overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover opacity-80" />
              </div>
            ))}
          </div>
        </div>

        <div className="md:sticky md:top-24 self-start">
          <Link to="/products" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">← {product.category}</Link>
          <h1 className="font-display text-4xl md:text-5xl mt-3">{product.name}</h1>
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="text-2xl">${product.price}</span>
            <span className="flex items-center gap-1 text-muted-foreground"><Star className="size-3.5 fill-current" /> {product.rating} · 218 reviews</span>
          </div>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center bg-surface rounded-full">
              <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="p-3"><Minus className="size-4" /></button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="p-3"><Plus className="size-4" /></button>
            </div>
            <button onClick={() => { add(product.id, qty); toast.success(`Added ${qty} × ${product.name}`); }}
              className="flex-1 h-12 rounded-full bg-foreground text-background text-sm hover-lift">
              Add to bag — ${product.price * qty}
            </button>
            <button aria-label={wished ? "Remove from wishlist" : "Add to wishlist"} onClick={() => toggleWish(product.id)} className="size-12 rounded-full bg-surface grid place-items-center hover-lift">
              <Heart className={`size-4 ${wished ? "fill-accent text-accent" : ""}`} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-xs text-muted-foreground">
            <Feature icon={<Truck className="size-4" />} label="Free shipping over $200" />
            <Feature icon={<RotateCcw className="size-4" />} label="30-day returns" />
            <Feature icon={<ShieldCheck className="size-4" />} label="2-year warranty" />
          </div>

          <details className="mt-10 border-t border-border pt-6">
            <summary className="cursor-pointer text-sm font-medium">Reviews (218)</summary>
            <div className="mt-4 space-y-4">
              {[
                { n: "Sarah K.", t: "Genuinely beautiful. Better in person." },
                { n: "Marc D.", t: "Holds up to daily use. Worth every penny." },
              ].map((r) => (
                <div key={r.n} className="text-sm">
                  <div className="flex items-center gap-2"><span className="font-medium">{r.n}</span><Star className="size-3 fill-current" /></div>
                  <p className="text-muted-foreground mt-1">{r.t}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl mb-8">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
      {recent.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl mb-8">Recently viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {recent.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <div className="flex flex-col gap-2">{icon}<span>{label}</span></div>;
}