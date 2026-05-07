import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Plus, Pencil } from "lucide-react";
import { products as seed, type Product } from "@/data/products";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Admin — Lumen" }] }),
});

function Admin() {
  const user = useShop((s) => s.user);
  const nav = useNavigate();
  const [list, setList] = useState<Product[]>(seed);
  const [edit, setEdit] = useState<Product | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") nav({ to: "/login" });
  }, [user, nav]);

  if (!user || user.role !== "admin") return null;

  const stats = {
    revenue: list.reduce((s, p) => s + p.price * (40 - p.stock), 0),
    items: list.length,
    stock: list.reduce((s, p) => s + p.stock, 0),
  };

  return (
    <div className="container-x py-12">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2">Dashboard</h1>
      </header>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <Stat label="Estimated revenue" v={`$${stats.revenue.toLocaleString()}`} />
        <Stat label="Products" v={String(stats.items)} />
        <Stat label="Total stock" v={String(stats.stock)} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl">Products</h2>
        <button onClick={() => setEdit({ id: crypto.randomUUID(), name: "", price: 0, category: "Home", image: "", rating: 5, stock: 10, description: "" })}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-foreground text-background text-sm">
          <Plus className="size-4" /> New product
        </button>
      </div>

      <div className="bg-surface rounded-3xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-widest text-muted-foreground">
            <tr><th className="text-left p-4">Product</th><th className="text-left p-4">Category</th><th className="text-left p-4">Price</th><th className="text-left p-4">Stock</th><th></th></tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-4 flex items-center gap-3">
                  {p.image && <img src={p.image} alt="" className="size-10 rounded-lg object-cover" />}
                  {p.name}
                </td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">${p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4 text-right">
                  <button onClick={() => setEdit(p)} className="p-2 hover:bg-background rounded-lg"><Pencil className="size-4" /></button>
                  <button onClick={() => { setList(list.filter((x) => x.id !== p.id)); toast.success("Deleted"); }} className="p-2 hover:bg-background rounded-lg">
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {edit && (
        <div className="fixed inset-0 z-50 bg-foreground/30 grid place-items-center p-4" onClick={() => setEdit(null)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-card rounded-3xl p-8 w-full max-w-lg space-y-4">
            <h3 className="font-display text-2xl">{list.find((p) => p.id === edit.id) ? "Edit" : "New"} product</h3>
            <In label="Name" v={edit.name} on={(v) => setEdit({ ...edit, name: v })} />
            <div className="grid grid-cols-2 gap-3">
              <In label="Price" type="number" v={String(edit.price)} on={(v) => setEdit({ ...edit, price: Number(v) })} />
              <In label="Stock" type="number" v={String(edit.stock)} on={(v) => setEdit({ ...edit, stock: Number(v) })} />
            </div>
            <In label="Category" v={edit.category} on={(v) => setEdit({ ...edit, category: v })} />
            <In label="Image URL" v={edit.image} on={(v) => setEdit({ ...edit, image: v })} />
            <label className="block">
              <span className="text-xs text-muted-foreground">Description</span>
              <textarea value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })}
                className="mt-1 w-full rounded-xl bg-surface p-3 text-sm outline-none min-h-24" />
            </label>
            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => setEdit(null)} className="px-4 h-10 rounded-full text-sm">Cancel</button>
              <button onClick={() => {
                setList((l) => l.find((p) => p.id === edit.id) ? l.map((p) => p.id === edit.id ? edit : p) : [...l, edit]);
                toast.success("Saved");
                setEdit(null);
              }} className="px-5 h-10 rounded-full bg-foreground text-background text-sm">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, v }: { label: string; v: string }) {
  return (
    <div className="bg-surface rounded-3xl p-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-3xl mt-2">{v}</p>
    </div>
  );
}
function In({ label, v, on, type = "text" }: { label: string; v: string; on: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input type={type} value={v} onChange={(e) => on(e.target.value)}
        className="mt-1 w-full h-11 rounded-xl bg-surface px-4 text-sm outline-none" />
    </label>
  );
}
