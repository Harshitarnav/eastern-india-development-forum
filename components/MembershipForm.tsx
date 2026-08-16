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
      <div className="eidf-panel border-emerald/25 bg-white p-10 text-center md:p-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-emerald/30 bg-emerald/10 text-emerald">
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
    <form onSubmit={onSubmit} className="eidf-panel bg-white">
      <div className="border-b border-line px-6 py-6 md:px-8 md:py-7">
        <div className="flex items-center gap-3">
          <span className="hidden h-px w-8 bg-gold sm:block" aria-hidden />
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-label">
            Membership Desk
          </div>
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy">
          Membership Application
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Tell us how you&apos;d like to contribute to Eastern India&apos;s development.
        </p>
      </div>

      <div className="space-y-7 px-6 py-7 md:px-8 md:py-8">
        <fieldset className="space-y-4">
          <legend className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            Identity
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="m-full_name">Full Name</FieldLabel>
              <input
                id="m-full_name"
                name="full_name"
                required
                className={fieldClass}
                placeholder="Your full name"
                disabled={status === "loading"}
              />
            </div>
            <div>
              <FieldLabel htmlFor="m-email">Email</FieldLabel>
              <input
                id="m-email"
                name="email"
                type="email"
                required
                className={fieldClass}
                placeholder="you@example.com"
                disabled={status === "loading"}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4 border-t border-line pt-7">
          <legend className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            Location
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="m-city">Current Location (City)</FieldLabel>
              <input
                id="m-city"
                name="city"
                className={fieldClass}
                placeholder="City"
                disabled={status === "loading"}
              />
            </div>
            <div>
              <FieldLabel htmlFor="m-country">Country</FieldLabel>
              <input
                id="m-country"
                name="country"
                className={fieldClass}
                placeholder="Country"
                disabled={status === "loading"}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4 border-t border-line pt-7">
          <legend className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            Contribution
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="m-phone">Phone (optional)</FieldLabel>
              <input
                id="m-phone"
                name="phone"
                className={fieldClass}
                placeholder="+91 ..."
                disabled={status === "loading"}
              />
            </div>
            <div>
              <FieldLabel htmlFor="m-contribution">I&apos;d like to contribute</FieldLabel>
              <select
                id="m-contribution"
                name="contribution_type"
                className={fieldClass}
                defaultValue="network"
                disabled={status === "loading"}
              >
                <option value="time">Time</option>
                <option value="skill">Skill</option>
                <option value="funds">Funding</option>
                <option value="network">Network</option>
              </select>
            </div>
          </div>
          <div>
            <FieldLabel htmlFor="m-message">Message (optional)</FieldLabel>
            <textarea
              id="m-message"
              name="message"
              rows={4}
              className={fieldClass}
              placeholder="Share any specific interests or project preferences..."
              disabled={status === "loading"}
            />
          </div>
        </fieldset>

        {error && (
          <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full disabled:opacity-60"
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
      </div>
    </form>
  );
}
