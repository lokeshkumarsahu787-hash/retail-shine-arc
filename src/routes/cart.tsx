import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useShop, cartTotals } from "@/store/shop";
import { products } from "@/data/products";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Cart — Lumen" }] }),
});

function CartPage() {
  const cart = useShop((s) => s.cart);
  const setQty = useShop((s) => s.setQty);
  const remove = useShop((s) => s.remove);
  const { items, subtotal, shipping, tax, total } = cartTotals(cart, products);

  if (items.length === 0)
    return (
      <div className="container-x py-32 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <p className="text-muted-foreground mt-3">Find something you'll love.</p>
        <Link to="/products" className="inline-block mt-8 px-6 h-12 leading-[3rem] rounded-full bg-foreground text-background text-sm">Shop now</Link>
      </div>
    );

  return (
    <div className="container-x py-12">
      <h1 className="font-display text-4xl md:text-5xl mb-10">Bag</h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-12">
        <div className="space-y-6">
          {items.map((i) => (
            <div key={i.id} className="flex gap-5 pb-6 border-b border-border">
              <Link to="/products/$id" params={{ id: i.id }} className="size-28 rounded-2xl bg-surface overflow-hidden shrink-0">
                <img src={i.product.image} alt="" className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{i.product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{i.product.category}</p>
                  </div>
                  <p className="text-sm">${i.product.price * i.qty}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center bg-surface rounded-full">
                    <button onClick={() => setQty(i.id, i.qty - 1)} className="p-2"><Minus className="size-3.5" /></button>
                    <span className="w-6 text-center text-sm">{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty + 1)} className="p-2"><Plus className="size-3.5" /></button>
                  </div>
                  <button onClick={() => remove(i.id)} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                    <X className="size-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-surface rounded-3xl p-8 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-2xl mb-6">Summary</h2>
          <Row label="Subtotal" v={`$${subtotal.toFixed(2)}`} />
          <Row label="Shipping" v={shipping === 0 ? "Free" : `$${shipping}`} />
          <Row label="Tax (est.)" v={`$${tax.toFixed(2)}`} />
          <div className="border-t border-border my-4" />
          <Row label="Total" v={`$${total.toFixed(2)}`} bold />
          <Link to="/checkout" className="block mt-8 text-center h-12 leading-[3rem] rounded-full bg-foreground text-background text-sm hover-lift">
            Checkout
          </Link>
          <Link to="/products" className="block mt-3 text-center text-xs text-muted-foreground hover:text-foreground">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
function Row({ label, v, bold }: { label: string; v: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between py-1.5 text-sm ${bold ? "text-base font-medium" : ""}`}>
      <span className={bold ? "" : "text-muted-foreground"}>{label}</span><span>{v}</span>
    </div>
  );
}
