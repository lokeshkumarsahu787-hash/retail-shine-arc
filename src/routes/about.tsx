import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({ meta: [{ title: "About — Lumen" }, { name: "description", content: "A small studio. Honest materials. Quiet design." }] }),
});

function About() {
  return (
    <div className="container-x py-20 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Our story</p>
      <h1 className="font-display text-5xl md:text-7xl mt-4 leading-[1.05]">A small studio.<br />Honest materials.<br />Quiet design.</h1>
      <div className="mt-12 space-y-6 text-muted-foreground leading-relaxed">
        <p>Lumen began in a sunlit corner of a workshop in Lisbon, with one belief: the best objects are the ones you stop noticing — because they simply work, every day, for years.</p>
        <p>We design slowly. We choose makers who care. We pick materials that age into something better than they started. Then we put our name on it and ship it to you.</p>
        <p>Thank you for being here.</p>
      </div>
    </div>
  );
}
