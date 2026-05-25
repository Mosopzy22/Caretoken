"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormState {
  nickname: string;
  age: string;
  condition: string;
  symptoms: string;
  treatment: string;
  fundingGoal: string;
  notes: string;
}

const INITIAL: FormState = {
  nickname: "",
  age: "",
  condition: "",
  symptoms: "",
  treatment: "",
  fundingGoal: "",
  notes: "",
};

export default function CreatePage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit() {
    const required: (keyof FormState)[] = [
      "nickname", "age", "condition", "symptoms", "treatment", "fundingGoal",
    ];
    if (required.some((k) => !form[k].trim())) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server error ${res.status}`);
      }

      const data = await res.json();

      // Store result in sessionStorage so the results page can read it
      sessionStorage.setItem("caretoken_result", JSON.stringify({ ...data, patientForm: form }));
      router.push("/results");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(`Failed to generate profile: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative z-10 max-w-2xl mx-auto px-6 pb-24">
      {/* Header */}
      <div className="pt-12 mb-8">
        <Link href="/" className="btn-ghost text-xs px-3 py-2 inline-block mb-5">
          ← Back
        </Link>
        <span className="tag ml-3">Step 1 of 2</span>
        <h1 className="syne text-4xl font-extrabold mt-4 mb-2">
          Create Recovery <span className="grad-text">Campaign</span>
        </h1>
        <p className="text-muted text-sm leading-relaxed">
          Your AI agent will generate a full campaign profile, milestone timeline,
          and Swarms Marketplace listing.
        </p>
      </div>

      {/* Form card */}
      <div className="card space-y-5">
        {/* Row: nickname + age */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>
              Patient Nickname <span className="text-pink-400">*</span>
            </label>
            <input
              type="text"
              value={form.nickname}
              onChange={set("nickname")}
              placeholder="e.g. Alex"
            />
          </div>
          <div>
            <label>
              Age <span className="text-pink-400">*</span>
            </label>
            <input
              type="number"
              value={form.age}
              onChange={set("age")}
              placeholder="e.g. 34"
              min={0}
              max={120}
            />
          </div>
        </div>

        {/* Condition */}
        <div>
          <label>
            Condition / Diagnosis <span className="text-pink-400">*</span>
          </label>
          <input
            type="text"
            value={form.condition}
            onChange={set("condition")}
            placeholder="e.g. Stage 2 Kidney Disease"
          />
        </div>

        {/* Symptoms */}
        <div>
          <label>
            Symptoms <span className="text-pink-400">*</span>
          </label>
          <textarea
            rows={3}
            value={form.symptoms}
            onChange={set("symptoms")}
            placeholder="e.g. Chronic fatigue, swelling, reduced kidney function"
            style={{ resize: "vertical" }}
          />
        </div>

        {/* Treatment */}
        <div>
          <label>
            Treatment Needed <span className="text-pink-400">*</span>
          </label>
          <textarea
            rows={3}
            value={form.treatment}
            onChange={set("treatment")}
            placeholder="e.g. Dialysis 3x/week, potential transplant evaluation"
            style={{ resize: "vertical" }}
          />
        </div>

        {/* Funding Goal */}
        <div>
          <label>
            Funding Goal (USD) <span className="text-pink-400">*</span>
          </label>
          <div className="relative">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              style={{ pointerEvents: "none" }}
            >
              $
            </span>
            <input
              type="number"
              value={form.fundingGoal}
              onChange={set("fundingGoal")}
              placeholder="e.g. 45000"
              style={{ paddingLeft: "1.75rem" }}
              min={0}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label>Additional Medical Notes (optional)</label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={set("notes")}
            placeholder="Any context, prior treatments, support already received..."
            style={{ resize: "vertical" }}
          />
        </div>

        {/* Error */}
        {error && (
          <div
            className="rounded-xl px-4 py-3 text-sm"
            style={{
              background: "rgba(255,94,132,0.1)",
              border: "1px solid rgba(255,94,132,0.3)",
              color: "#ff5e84",
            }}
          >
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          className="btn-primary w-full text-base py-4 flex items-center justify-center gap-3"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Generating AI Profile…
            </>
          ) : (
            "⚡ Generate AI Recovery Profile"
          )}
        </button>

        <p className="text-center text-xs text-muted pt-1">
          Powered by GPT-4o · No medical diagnosis will be made · Hopeful, supportive tone only
        </p>
      </div>
    </main>
  );
}
