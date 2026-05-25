"use client";

import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      icon: "🧬",
      title: "AI Medical Summaries",
      desc: "Plain-language explanations of conditions, treatments, and recovery paths — no jargon, just clarity supporters can trust.",
      color: "#00e5c8",
    },
    {
      icon: "📊",
      title: "Transparent Recovery Milestones",
      desc: "Auto-generated care timelines that show supporters exactly how their contribution moves the patient forward, phase by phase.",
      color: "#4fa8ff",
    },
    {
      icon: "🪙",
      title: "Tokenized Healthcare Support",
      desc: "Every campaign is Swarms-compatible with full Frenzy Mode tokenization — supporters become stakeholders in recovery.",
      color: "#f5c842",
    },
  ];

  const steps = [
    { n: "01", label: "Enter Patient Info", desc: "Nickname, age, condition, symptoms, and funding goal" },
    { n: "02", label: "AI Generates Profile", desc: "GPT-4o creates a plain-language summary and milestone timeline" },
    { n: "03", label: "Review Campaign", desc: "See the full recovery story, tokenization plan, and Swarms listing text" },
    { n: "04", label: "Launch & Fund", desc: "Publish to Swarms Marketplace and activate Frenzy Mode" },
  ];

  return (
    <main className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
      {/* ── Hero ── */}
      <section className="text-center pt-24 pb-16">
        <div className="flex justify-center gap-3 mb-6">
          <span className="tag">
            <span className="glow-dot" />
            Swarms Marketplace Compatible
          </span>
          <span className="tag tag-gold">⚡ Frenzy Mode</span>
        </div>

        <h1 className="syne text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          AI-powered healthcare funding
          <br />
          <span className="grad-text">through tokenization</span>
        </h1>

        <p className="text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Transform patient recovery stories into transparent, AI-generated campaigns that
          supporters can understand, trust, and fund — all on the Swarms Marketplace.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/create" className="btn-primary text-base px-10 py-4">
            Create Recovery Campaign →
          </Link>
          <Link href="/agent" className="btn-ghost text-base px-8 py-4">
            View Agent Metadata
          </Link>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="card grid grid-cols-2 md:grid-cols-4 divide-x divide-border mb-16 p-0 overflow-hidden">
        {[
          { value: "AI-Powered", label: "Campaign Generation" },
          { value: "Swarms", label: "Marketplace Ready" },
          { value: "Frenzy", label: "Mode Enabled" },
          { value: "Zero", label: "Medical Jargon" },
        ].map((s, i) => (
          <div key={i} className="py-7 text-center">
            <div
              className="syne text-xl font-extrabold"
              style={{ color: i % 2 === 0 ? "#00e5c8" : "#4fa8ff" }}
            >
              {s.value}
            </div>
            <div className="text-muted text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Feature cards ── */}
      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {features.map((f, i) => (
          <div key={i} className="card relative overflow-hidden">
            <div
              className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full"
              style={{
                background: `radial-gradient(circle, ${f.color}20, transparent 70%)`,
              }}
            />
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="syne font-bold text-lg mb-2" style={{ color: f.color }}>
              {f.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* ── How it works ── */}
      <div className="card p-10 mb-12">
        <h2 className="syne text-2xl font-extrabold text-center mb-10">
          How <span className="grad-text">CareToken</span> Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="syne text-4xl font-extrabold text-border mb-2">{s.n}</div>
              <div className="syne font-bold text-sm mb-2">{s.label}</div>
              <div className="text-muted text-xs leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <div
        className="rounded-2xl p-12 text-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,229,200,0.08), rgba(79,168,255,0.08))",
          border: "1px solid rgba(0,229,200,0.18)",
        }}
      >
        <h2 className="syne text-3xl font-extrabold mb-4">
          Ready to tokenize a recovery campaign?
        </h2>
        <p className="text-muted mb-8 text-sm">
          Fill out the form and your AI agent does the rest — medical summary, milestones, Swarms listing.
        </p>
        <Link href="/create" className="btn-primary text-base px-10 py-4">
          Create Recovery Campaign →
        </Link>
      </div>
    </main>
  );
}
