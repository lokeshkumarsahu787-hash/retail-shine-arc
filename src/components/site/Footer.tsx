import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-surface">
      <div className="container-x py-16 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl">Lumen<span className="text-accent">.</span></h3>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">Considered objects for a quieter life. Made to last, made to love.</p>
        </div>
        <Col title="Shop" links={[["All products", "/products"], ["Wishlist", "/wishlist"], ["Cart", "/cart"]]} />
        <Col title="Company" links={[["About", "/about"], ["Journal", "/about"], ["Contact", "/about"]]} />
        <Col title="Account" links={[["Sign in", "/login"], ["Create account", "/register"], ["Dashboard", "/account"]]} />
      </div>
      <div className="border-t border-border">
        <div className="container-x py-6 text-xs text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} Lumen Studio</span>
          <span>Crafted with care.</span>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-widest text-muted-foreground">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map(([label, to]) => (
          <li key={label}><Link to={to} className="hover:text-accent">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
