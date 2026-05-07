import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/account")({
  component: Account,
  head: () => ({ meta: [{ title: "Account — Lumen" }] }),
});

function Account() {
  const user = useShop((s) => s.user);
  const logout = useShop((s) => s.logout);
  const wishlist = useShop((s) => s.wishlist);
  const addresses = useShop((s) => s.addresses);
  const nav = useNavigate();

  useEffect(() => { if (!user) nav({ to: "/login" }); }, [user, nav]);
  if (!user) return null;

  return (
    <div className="container-x py-12">
      <header className="flex items-center justify-between mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Account</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2">Hi, {user.name}</h1>
        </div>
        <button onClick={logout} className="text-sm text-muted-foreground hover:text-foreground">Sign out</button>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Profile">
          <p className="text-sm">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-xs mt-3 inline-block bg-surface px-3 py-1 rounded-full">{user.role}</p>
        </Card>
        <Card title="Orders">
          <p className="text-sm text-muted-foreground">No recent orders.</p>
          <Link to="/products" className="text-sm underline mt-3 inline-block">Start shopping</Link>
        </Card>
        <Card title="Wishlist">
          <p className="text-sm">{wishlist.length} saved item{wishlist.length === 1 ? "" : "s"}</p>
          <Link to="/wishlist" className="text-sm underline mt-3 inline-block">View wishlist</Link>
        </Card>
        <Card title="Addresses">
          {addresses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved addresses.</p>
          ) : (
            <ul className="text-sm space-y-2">
              {addresses.map((a, i) => (
                <li key={i}>{a.name} · {a.line1}, {a.city} {a.zip}</li>
              ))}
            </ul>
          )}
        </Card>
        {user.role === "admin" && (
          <Card title="Admin">
            <p className="text-sm text-muted-foreground">Manage products and orders.</p>
            <Link to="/admin" className="text-sm underline mt-3 inline-block">Open admin panel</Link>
          </Card>
        )}
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface rounded-3xl p-6">
      <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{title}</h3>
      {children}
    </div>
  );
}
