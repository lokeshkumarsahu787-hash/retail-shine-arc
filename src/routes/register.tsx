import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/register")({
  component: Register,
  head: () => ({ meta: [{ title: "Create account — Lumen" }] }),
});

function Register() {
  const login = useShop((s) => s.login);
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", pw: "" });
  return (
    <div className="container-x py-20 max-w-md">
      <h1 className="font-display text-4xl">Create account</h1>
      <p className="text-muted-foreground mt-2 text-sm">Join Lumen for early access to new arrivals.</p>
      <form onSubmit={(e) => { e.preventDefault(); login(f.email, f.name); toast.success("Welcome to Lumen"); nav({ to: "/account" }); }} className="mt-8 space-y-4">
        <F label="Name" v={f.name} on={(v) => setF({ ...f, name: v })} />
        <F label="Email" type="email" v={f.email} on={(v) => setF({ ...f, email: v })} />
        <F label="Password" type="password" v={f.pw} on={(v) => setF({ ...f, pw: v })} />
        <button className="w-full h-12 rounded-full bg-foreground text-background text-sm">Create account</button>
      </form>
    </div>
  );
}
function F({ label, v, on, type = "text" }: { label: string; v: string; on: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input required type={type} value={v} onChange={(e) => on(e.target.value)}
        className="mt-1 w-full h-11 rounded-xl bg-surface px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
    </label>
  );
}
