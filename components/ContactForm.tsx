"use client";

import { FormEvent, useState } from "react";
import { FieldLabel, fieldClass } from "@/components/ui";

export function ContactForm({ defaultSubject = "Membership" }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: data.get("full_name"),
        email: data.get("email"),
        phone: data.get("phone"),
        subject: data.get("subject"),
        message: data.get("message"),
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
      <div className="rounded-2xl border border-line bg-white p-8 text-center md:p-9">
        <h3 className="font-display text-xl">Message sent</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We&apos;ve received your note and will reply soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-white p-6 md:p-9">
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Name</FieldLabel>
          <input name="full_name" required className={fieldClass} />
        </div>
        <div>
          <FieldLabel>Email</FieldLabel>
          <input name="email" type="email" required className={fieldClass} />
        </div>
      </div>
      <div className="mb-4">
        <FieldLabel>Phone (optional)</FieldLabel>
        <input name="phone" className={fieldClass} />
      </div>
      <div className="mb-4">
        <FieldLabel>Subject</FieldLabel>
        <select name="subject" className={fieldClass} defaultValue={defaultSubject}>
          <option>Membership</option>
          <option>Funding</option>
          <option>Media</option>
          <option>Other</option>
        </select>
      </div>
      <div className="mb-5">
        <FieldLabel>Message</FieldLabel>
        <textarea name="message" required rows={6} className={fieldClass} />
      </div>
      {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-navy py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
