import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Sign in — Lumen" }] }),
});

function Login() {
  const login = useShop((s) => s.login);
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return (
    <div className="container-x py-20 max-w-md">
      <h1 className="font-display text-4xl">Welcome back</h1>
      <p className="text-muted-foreground mt-2 text-sm">Sign in to your Lumen account.</p>
      <form onSubmit={(e) => { e.preventDefault(); login(email); toast.success("Signed in"); nav({ to: "/account" }); }} className="mt-8 space-y-4">
        <Field label="Email" type="email" v={email} on={setEmail} />
        <Field label="Password" type="password" v={pw} on={setPw} />
        <button className="w-full h-12 rounded-full bg-foreground text-background text-sm">Sign in</button>
        <div className="flex justify-between text-xs text-muted-foreground">
          <Link to="/register">Create account</Link>
          <Link to="/forgot">Forgot password?</Link>
        </div>
        <p className="text-xs text-center text-muted-foreground pt-4">Tip: include "admin" in your email to access the admin panel.</p>
      </form>
    </div>
  );
}

function Field({ label, v, on, type = "text" }: { label: string; v: string; on: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input required type={type} value={v} onChange={(e) => on(e.target.value)}
        className="mt-1 w-full h-11 rounded-xl bg-surface px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
    </label>
  );
}
