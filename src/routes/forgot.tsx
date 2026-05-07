import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot")({ component: Forgot });

function Forgot() {
  const [email, setEmail] = useState("");
  return (
    <div className="container-x py-20 max-w-md">
      <h1 className="font-display text-4xl">Reset password</h1>
      <p className="text-muted-foreground mt-2 text-sm">We'll email you a reset link.</p>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Check your inbox"); }} className="mt-8 space-y-4">
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
          className="w-full h-11 rounded-xl bg-surface px-4 text-sm outline-none" />
        <button className="w-full h-12 rounded-full bg-foreground text-background text-sm">Send reset link</button>
      </form>
    </div>
  );
}
