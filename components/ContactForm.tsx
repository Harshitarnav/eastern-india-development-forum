"use client";

import { FormEvent, useState } from "react";
import { CheckCircle, Loader2, Send } from "lucide-react";
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
      <div className="rounded-3xl border border-emerald/20 bg-white p-10 text-center shadow-xl md:p-12">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald/15 text-emerald">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="font-display text-2xl font-bold text-navy">Message sent</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          We&apos;ve received your note and will reply soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-line bg-white p-6 shadow-xl md:p-9"
    >
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-gold">
          Send a Message
        </span>
        <h3 className="mt-1 font-display text-xl font-bold text-navy md:text-2xl">
          How can we help?
        </h3>
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Name</FieldLabel>
          <input name="full_name" required className={fieldClass} placeholder="Your name" />
        </div>
        <div>
          <FieldLabel>Email</FieldLabel>
          <input name="email" type="email" required className={fieldClass} placeholder="you@example.com" />
        </div>
      </div>
      <div className="mb-4">
        <FieldLabel>Phone (optional)</FieldLabel>
        <input name="phone" className={fieldClass} placeholder="+91 ..." />
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
        <textarea
          name="message"
          required
          rows={6}
          className={fieldClass}
          placeholder="Tell us about your inquiry..."
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
        className="flex w-full items-center justify-center gap-2 rounded-full bg-navy py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-navy-light disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send Message <Send className="h-4 w-4 text-gold" />
          </>
        )}
      </button>
    </form>
  );
}
