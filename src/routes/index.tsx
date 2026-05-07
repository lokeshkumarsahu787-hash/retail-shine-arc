import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const featured = products.slice(0, 4);
  return (
    <div>
      {/* Hero */}
      <section className="container-x pt-12 md:pt-20 pb-20 md:pb-32 grid md:grid-cols-12 gap-10 items-end">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="md:col-span-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Autumn Edit · 2026</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05]">
            Considered objects<br />for a quieter life.
          </h1>
          <p className="mt-6 text-muted-foreground max-w-md">
            Lumen is a small studio crafting timeless goods from honest materials. No trends. No noise. Just things you'll keep.
          </p>
          <div className="mt-8 flex gap-3">
            <Link to="/products" className="group inline-flex items-center gap-2 bg-foreground text-background px-6 h-12 rounded-full text-sm hover-lift">
              Shop the edit <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="inline-flex items-center px-6 h-12 rounded-full text-sm border border-border hover:bg-surface">Our story</Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="md:col-span-6">
          <div className="relative overflow-hidden rounded-3xl aspect-4/5 md:aspect-5/6">
            <img src={hero} alt="Featured" className="w-full h-full object-cover" width={1600} height={1024} />
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="container-x">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl">Browse by category</h2>
          <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.slice(1).map((c) => (
            <Link key={c} to="/products" search={{ category: c } as never}
              className="aspect-4/3 md:aspect-square rounded-2xl bg-surface grid place-items-center text-sm hover:bg-accent hover:text-accent-foreground transition-colors hover-lift">
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-x mt-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured</p>
            <h2 className="font-display text-3xl md:text-4xl mt-2">New arrivals</h2>
          </div>
          <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground">All products →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Promo banner */}
      <section className="container-x mt-32">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-60">Complimentary shipping</p>
            <h2 className="font-display text-3xl md:text-5xl mt-3">On every order over $200.</h2>
          </div>
          <p className="opacity-70">A small thank-you for choosing things made to last. Free returns, always.</p>
        </div>
      </section>
    </div>
  );
}