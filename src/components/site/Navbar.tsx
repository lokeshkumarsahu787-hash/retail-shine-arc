import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, Heart, User, Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useShop } from "@/store/shop";
import { products } from "@/data/products";

export function Navbar() {
  const cart = useShop((s) => s.cart);
  const wishlist = useShop((s) => s.wishlist);
  const user = useShop((s) => s.user);
  const theme = useShop((s) => s.theme);
  const toggleTheme = useShop((s) => s.toggleTheme);
  const path = useRouterState({ select: (r) => r.location.pathname });
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const nav = useNavigate();
  const count = cart.reduce((s, c) => s + c.qty, 0);

  useEffect(() => {
    if (typeof document !== "undefined")
      document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => { setMobile(false); setOpen(false); }, [path]);

  const suggestions = q
    ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5)
    : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    nav({ to: "/products", search: { q } as never });
    setOpen(false);
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container-x flex items-center gap-6 h-16">
        <button className="md:hidden" onClick={() => setMobile(!mobile)} aria-label="Menu">
          {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <Link to="/" className="font-display text-2xl tracking-tight">Lumen<span className="text-accent">.</span></Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }} activeOptions={{ exact: l.to === "/" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submit} className="relative hidden md:block ml-auto w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search the store"
            className="w-full pl-9 pr-3 h-10 rounded-full bg-surface text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
          {open && suggestions.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
              {suggestions.map((p) => (
                <Link key={p.id} to="/products/$id" params={{ id: p.id }}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-surface text-sm">
                  <img src={p.image} alt="" className="size-8 rounded object-cover" />
                  <span className="flex-1">{p.name}</span>
                  <span className="text-muted-foreground">${p.price}</span>
                </Link>
              ))}
            </div>
          )}
        </form>

        <div className="flex items-center gap-1 ml-auto md:ml-0">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-surface" aria-label="Theme">
            {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
          </button>
          <Link to="/wishlist" className="p-2 rounded-full hover:bg-surface relative" aria-label="Wishlist">
            <Heart className="size-5" />
            {wishlist.length > 0 && <Dot n={wishlist.length} />}
          </Link>
          <Link to={user ? "/account" : "/login"} className="p-2 rounded-full hover:bg-surface" aria-label="Account">
            <User className="size-5" />
          </Link>
          <Link to="/cart" className="p-2 rounded-full hover:bg-surface relative" aria-label="Cart">
            <ShoppingBag className="size-5" />
            {count > 0 && <Dot n={count} />}
          </Link>
        </div>
      </div>

      {mobile && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-x py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="py-1 text-sm">{l.label}</Link>
            ))}
            <form onSubmit={submit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search"
                className="w-full pl-9 pr-3 h-10 rounded-full bg-surface text-sm outline-none" />
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

function Dot({ n }: { n: number }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-medium grid place-items-center">
      {n}
    </span>
  );
}
