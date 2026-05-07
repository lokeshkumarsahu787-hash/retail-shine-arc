import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

type Search = { q?: string; category?: string; sort?: string; min?: number; max?: number; page?: number };

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: (s.q as string) || "",
    category: (s.category as string) || "All",
    sort: (s.sort as string) || "featured",
    min: Number(s.min) || 0,
    max: Number(s.max) || 1000,
    page: Number(s.page) || 1,
  }),
  component: ProductsPage,
  head: () => ({ meta: [{ title: "Shop — Lumen" }, { name: "description", content: "Browse the full Lumen collection." }] }),
});

const PAGE = 8;

function ProductsPage() {
  const search = Route.useSearch();
  const nav = useNavigate({ from: "/products" });
  const [range, setRange] = useState(search.max);

  const filtered = useMemo(() => {
    let r = [...products];
    if (search.category && search.category !== "All") r = r.filter((p) => p.category === search.category);
    if (search.q) r = r.filter((p) => p.name.toLowerCase().includes(search.q!.toLowerCase()));
    r = r.filter((p) => p.price >= (search.min || 0) && p.price <= (search.max || 1000));
    if (search.sort === "price-asc") r.sort((a, b) => a.price - b.price);
    if (search.sort === "price-desc") r.sort((a, b) => b.price - a.price);
    if (search.sort === "rating") r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [search]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const page = Math.min(search.page || 1, pages);
  const view = filtered.slice((page - 1) * PAGE, page * PAGE);

  const update = (patch: Partial<Search>) =>
    nav({ search: (prev: Search) => ({ ...prev, ...patch, page: 1 }) as never });

  return (
    <div className="container-x py-12">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Collection</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2">All products</h1>
      </header>

      <div className="grid md:grid-cols-[240px_1fr] gap-10">
        <aside className="space-y-8">
          <div>
            <h3 className="text-xs uppercase tracking-widest mb-3">Category</h3>
            <ul className="space-y-1.5 text-sm">
              {categories.map((c) => (
                <li key={c}>
                  <button onClick={() => update({ category: c })}
                    className={`hover:text-foreground transition-colors ${search.category === c ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest mb-3">Price · up to ${range}</h3>
            <input aria-label={`Maximum price: $${range}`} type="range" min={0} max={500} step={25} value={range}
              onChange={(e) => setRange(Number(e.target.value))}
              onMouseUp={(e) => update({ max: Number((e.target as HTMLInputElement).value) })}
              onTouchEnd={(e) => update({ max: Number((e.target as HTMLInputElement).value) })}
              className="w-full accent-accent" />
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">{filtered.length} products</p>
            <select aria-label="Sort products" value={search.sort} onChange={(e) => update({ sort: e.target.value })}
              className="bg-surface text-sm rounded-full px-4 h-10 outline-none">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>

          {view.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No products match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
              {view.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}

          {pages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => nav({ search: (p: Search) => ({ ...p, page: n }) as never })}
                  className={`size-10 rounded-full text-sm ${n === page ? "bg-foreground text-background" : "hover:bg-surface"}`}>
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}