"use client";

import { FormEvent, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { JOIN_INTENTS, JOIN_STATES } from "@/lib/join";

const fieldClass =
  "w-full min-h-12 rounded-lg border border-line bg-white px-4 py-3 text-base text-navy outline-none transition placeholder:text-muted/70 hover:border-navy/20 focus:border-gold focus:ring-2 focus:ring-gold/25 disabled:cursor-not-allowed disabled:opacity-60";

function BiLabel({
  htmlFor,
  en,
  hi,
  required = false,
}: {
  htmlFor: string;
  en: string;
  hi: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block">
      <span className="block text-[13px] font-bold text-navy">
        {en}
        {required ? <span className="text-gold-label"> *</span> : null}
      </span>
      <span className="font-hi mt-0.5 block text-[13px] font-semibold leading-snug text-navy/75">
        {hi}
      </span>
    </label>
  );
}

export function JoinForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: data.get("full_name"),
          phone: data.get("phone"),
          state: data.get("state"),
          place: data.get("place"),
          intent: data.get("intent"),
          email: data.get("email"),
          website: data.get("website"),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Something went wrong. फिर कोशिश करें।");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("done");
    } catch {
      setError("Network error. Please try again. नेटवर्क की समस्या। फिर कोशिश करें।");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="eidf-panel px-5 py-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald/30 bg-emerald/10 text-emerald">
          <CheckCircle className="h-7 w-7" aria-hidden />
        </div>
        <h2 className="font-display text-2xl font-bold text-navy">We have your name.</h2>
        <p className="font-hi mt-2 text-lg font-semibold text-navy">हमने आपका नाम लिख लिया है।</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
          The EIDF desk will call you on the mobile number you wrote. This form does not ask for money.
        </p>
        <p className="font-hi mx-auto mt-2 max-w-sm text-sm font-medium leading-relaxed text-navy/80">
          ईआईडीएफ की टीम आपके मोबाइल नंबर पर बात करेगी। यह फॉर्म पैसे नहीं माँगता।
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="eidf-panel relative px-4 py-5 sm:px-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
        className="hidden"
      />

      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-label">
        Required · ज़रूरी
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy">
        Leave your name
      </h2>
      <p className="font-hi mt-1 text-base font-semibold text-navy/80">अपना नाम लिखें</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Write in English or Hindi. A person will call you. No payment on this page.
      </p>
      <p className="font-hi mt-1 text-sm font-medium leading-relaxed text-navy/75">
        अंग्रेज़ी या हिन्दी में भरें। कोई व्यक्ति आपको फोन करेगा। इस पेज पर कोई भुगतान नहीं।
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <BiLabel htmlFor="full_name" en="Full name" hi="पूरा नाम" required />
          <input
            id="full_name"
            name="full_name"
            required
            autoComplete="name"
            maxLength={80}
            className={fieldClass}
            placeholder="Your name · आपका नाम"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <BiLabel htmlFor="phone" en="Mobile number" hi="मोबाइल नंबर" required />
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            className={fieldClass}
            placeholder="10-digit mobile · 10 अंक"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <BiLabel htmlFor="state" en="State" hi="राज्य" required />
          <select
            id="state"
            name="state"
            required
            defaultValue=""
            className={fieldClass}
            disabled={status === "loading"}
          >
            <option value="">Select · चुनें</option>
            {JOIN_STATES.map((state) => (
              <option key={state.value} value={state.value}>
                {state.value} · {state.hi}
              </option>
            ))}
          </select>
        </div>

        <div>
          <BiLabel htmlFor="place" en="District or village" hi="जिला या गाँव" required />
          <input
            id="place"
            name="place"
            required
            autoComplete="address-level2"
            maxLength={80}
            className={fieldClass}
            placeholder="Where you live · जहाँ आप रहते हैं"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <BiLabel htmlFor="intent" en="I want to" hi="मैं जुड़ना चाहता/चाहती हूँ" required />
          <select
            id="intent"
            name="intent"
            required
            defaultValue=""
            className={fieldClass}
            disabled={status === "loading"}
          >
            <option value="">Select · चुनें</option>
            {JOIN_INTENTS.map((intent) => (
              <option key={intent.value} value={intent.value}>
                {intent.en} · {intent.hi}
              </option>
            ))}
          </select>
        </div>

        <div>
          <BiLabel htmlFor="email" en="Email" hi="ईमेल, जरूरी नहीं" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={fieldClass}
            placeholder="Only if you have one"
            disabled={status === "loading"}
          />
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary mt-6 min-h-12 w-full text-base disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending · भेज रहे हैं
          </>
        ) : (
          "Send my name · मेरा नाम भेजें"
        )}
      </button>
    </form>
  );
}
