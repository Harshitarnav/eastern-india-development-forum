"use client";

import { FormEvent, useState } from "react";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { FieldLabel, fieldClass } from "@/components/ui";

export function MembershipForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: data.get("full_name"),
          email: data.get("email"),
          city: data.get("city"),
          country: data.get("country"),
          contribution_type: data.get("contribution_type"),
          message: data.get("message"),
          phone: data.get("phone"),
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("done");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-emerald/20 bg-white p-10 text-center md:p-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald/15 text-emerald">
          <CheckCircle className="h-7 w-7" />
        </div>
        <h3 className="font-display text-2xl font-bold text-navy md:text-3xl">
          Application received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Thank you for joining the movement. Our team will reach out shortly to align on
          the right project or role for you.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-line bg-white p-6 md:p-8"
    >
      <div className="mb-8">
        <div className="text-[11px] font-bold uppercase tracking-widest text-gold-label">
          Membership Desk
        </div>
        <h3 className="mt-1 font-display text-2xl font-bold text-navy">
          Membership Application
        </h3>
        <p className="mt-2 text-sm text-muted">
          Tell us how you&apos;d like to contribute to Eastern India&apos;s development.
        </p>
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Full Name</FieldLabel>
          <input name="full_name" required className={fieldClass} placeholder="Your full name" disabled={status === "loading"} />
        </div>
        <div>
          <FieldLabel>Email</FieldLabel>
          <input name="email" type="email" required className={fieldClass} placeholder="you@example.com" disabled={status === "loading"} />
        </div>
      </div>
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Current Location (City)</FieldLabel>
          <input name="city" className={fieldClass} placeholder="City" disabled={status === "loading"} />
        </div>
        <div>
          <FieldLabel>Country</FieldLabel>
          <input name="country" className={fieldClass} placeholder="Country" disabled={status === "loading"} />
        </div>
      </div>
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Phone (optional)</FieldLabel>
          <input name="phone" className={fieldClass} placeholder="+91 ..." disabled={status === "loading"} />
        </div>
        <div>
          <FieldLabel>I&apos;d like to contribute</FieldLabel>
          <select name="contribution_type" className={fieldClass} defaultValue="network" disabled={status === "loading"}>
            <option value="time">Time</option>
            <option value="skill">Skill</option>
            <option value="funds">Funding</option>
            <option value="network">Network</option>
          </select>
        </div>
      </div>
      <div className="mb-6">
        <FieldLabel>Message (optional)</FieldLabel>
        <textarea
          name="message"
          rows={4}
          className={fieldClass}
          placeholder="Share any specific interests or project preferences..."
          disabled={status === "loading"}
        />
      </div>
      {error && (
        <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full !rounded-lg disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            Submit Application <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
