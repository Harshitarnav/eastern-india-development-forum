"use client";

import { FormEvent, useState } from "react";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { FieldLabel, fieldClass } from "@/components/ui";

const SUBJECTS = [
  "Membership",
  "Funding",
  "Tender Guidance",
  "Scheme Assistance",
  "Investment Inquiry",
  "Event Registration",
  "Report Request",
  "Media",
  "Other",
] as const;

export function ContactForm({
  defaultSubject = "Membership",
  defaultMessage = "",
}: {
  defaultSubject?: string;
  defaultMessage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const subjectOptions = SUBJECTS.includes(defaultSubject as (typeof SUBJECTS)[number])
    ? SUBJECTS
    : ([defaultSubject, ...SUBJECTS] as string[]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
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
        <h3 className="font-display text-2xl font-bold text-navy">Message sent</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          We&apos;ve received your note and will reply soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="eidf-panel bg-white">
      <div className="border-b border-line px-6 py-6 md:px-8 md:py-7">
        <div className="flex items-center gap-3">
          <span className="hidden h-px w-8 bg-gold sm:block" aria-hidden />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-label">
            Send a Message
          </span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy">
          How can we help?
        </h3>
      </div>

      <div className="space-y-7 px-6 py-7 md:px-8 md:py-8">
        <fieldset className="space-y-4">
          <legend className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            Contact details
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="c-full_name">Name</FieldLabel>
              <input
                id="c-full_name"
                name="full_name"
                required
                className={fieldClass}
                placeholder="Your name"
                disabled={status === "loading"}
              />
            </div>
            <div>
              <FieldLabel htmlFor="c-email">Email</FieldLabel>
              <input
                id="c-email"
                name="email"
                type="email"
                required
                className={fieldClass}
                placeholder="you@example.com"
                disabled={status === "loading"}
              />
            </div>
          </div>
          <div>
            <FieldLabel htmlFor="c-phone">Phone (optional)</FieldLabel>
            <input
              id="c-phone"
              name="phone"
              className={fieldClass}
              placeholder="+91 ..."
              disabled={status === "loading"}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4 border-t border-line pt-7">
          <legend className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            Inquiry
          </legend>
          <div>
            <FieldLabel htmlFor="c-subject">Subject</FieldLabel>
            <select
              id="c-subject"
              name="subject"
              className={fieldClass}
              defaultValue={defaultSubject}
              disabled={status === "loading"}
            >
              {subjectOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="c-message">Message</FieldLabel>
            <textarea
              id="c-message"
              name="message"
              required
              rows={6}
              className={fieldClass}
              placeholder="Tell us about your inquiry..."
              defaultValue={defaultMessage}
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
          className="btn-navy w-full disabled:opacity-60"
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
      </div>
    </form>
  );
}
