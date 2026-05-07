import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useShop, cartTotals } from "@/store/shop";
import { products } from "@/data/products";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Checkout — Lumen" }] }),
});

function Checkout() {
  const cart = useShop((s) => s.cart);
  const clear = useShop((s) => s.clearCart);
  const addAddress = useShop((s) => s.addAddress);
  const { items, subtotal, shipping, tax, total } = cartTotals(cart, products);
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", line1: "", city: "", zip: "", country: "United States", card: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({ name: form.name, line1: form.line1, city: form.city, zip: form.zip, country: form.country });
    clear();
    toast.success("Order placed — confirmation sent to your inbox");
    nav({ to: "/account" });
  };

  if (items.length === 0)
    return <div className="container-x py-32 text-center text-muted-foreground">Your bag is empty.</div>;

  return (
    <div className="container-x py-12">
      <h1 className="font-display text-4xl md:text-5xl mb-10">Checkout</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_400px] gap-12">
        <div className="space-y-8">
          <Section title="Contact">
            <Input label="Email" type="email" v={form.email} on={(v) => setForm({ ...form, email: v })} />
          </Section>
          <Section title="Shipping address">
            <Input label="Full name" v={form.name} on={(v) => setForm({ ...form, name: v })} />
            <Input label="Address" v={form.line1} on={(v) => setForm({ ...form, line1: v })} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="City" v={form.city} on={(v) => setForm({ ...form, city: v })} />
              <Input label="Postal code" v={form.zip} on={(v) => setForm({ ...form, zip: v })} />
            </div>
          </Section>
          <Section title="Payment">
            <Input label="Card number" v={form.card} on={(v) => setForm({ ...form, card: v })} />
            <p className="text-xs text-muted-foreground">Demo only — no real charges. Connect Stripe in a future step.</p>
          </Section>
        </div>

        <aside className="bg-surface rounded-3xl p-8 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-2xl mb-6">Order</h2>
          <div className="space-y-4 max-h-72 overflow-auto">
            {items.map((i) => (
              <div key={i.id} className="flex gap-3 text-sm">
                <img src={i.product.image} alt="" className="size-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <p>{i.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {i.qty}</p>
                </div>
                <p>${i.product.price * i.qty}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-6 pt-4 space-y-1.5 text-sm">
            <Row l="Subtotal" v={`$${subtotal.toFixed(2)}`} />
            <Row l="Shipping" v={shipping === 0 ? "Free" : `$${shipping}`} />
            <Row l="Tax" v={`$${tax.toFixed(2)}`} />
            <div className="flex justify-between text-base font-medium pt-2 border-t border-border">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button type="submit" className="w-full mt-6 h-12 rounded-full bg-foreground text-background text-sm hover-lift">Place order</button>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function Input({ label, v, on, type = "text" }: { label: string; v: string; on: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input required type={type} value={v} onChange={(e) => on(e.target.value)}
        className="mt-1 w-full h-11 rounded-xl bg-surface px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
    </label>
  );
}
function Row({ l, v }: { l: string; v: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{l}</span><span>{v}</span></div>;
}
