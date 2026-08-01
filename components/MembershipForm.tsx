"use client";

import { FormEvent, useState } from "react";
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
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center md:p-10">
        <h3 className="font-display text-xl md:text-2xl">Application received</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Thank you for joining the movement. Our team will reach out shortly to align on
          the right project or role for you.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-white p-6 md:p-10"
    >
      <h3 className="mb-6 text-center font-display text-xl md:text-2xl">
        Membership Application
      </h3>
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Full Name</FieldLabel>
          <input name="full_name" required className={fieldClass} />
        </div>
        <div>
          <FieldLabel>Email</FieldLabel>
          <input name="email" type="email" required className={fieldClass} />
        </div>
      </div>
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Current Location (City)</FieldLabel>
          <input name="city" className={fieldClass} />
        </div>
        <div>
          <FieldLabel>Country</FieldLabel>
          <input name="country" className={fieldClass} />
        </div>
      </div>
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Phone (optional)</FieldLabel>
          <input name="phone" className={fieldClass} />
        </div>
        <div>
          <FieldLabel>I&apos;d like to contribute</FieldLabel>
          <select name="contribution_type" className={fieldClass} defaultValue="network">
            <option value="time">Time</option>
            <option value="skill">Skill</option>
            <option value="funds">Funding</option>
            <option value="network">Network</option>
          </select>
        </div>
      </div>
      <div className="mb-6">
        <FieldLabel>Message (optional)</FieldLabel>
        <textarea name="message" rows={4} className={fieldClass} />
      </div>
      {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-gold py-3.5 text-sm font-bold text-navy-deep transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
