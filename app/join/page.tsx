import Link from "next/link";
import { JoinBar } from "@/components/join/JoinBar";
import { JoinForm } from "@/components/join/JoinForm";
import { JoinGallery } from "@/components/join/JoinGallery";
import { JoinSynopsis } from "@/components/join/JoinSynopsis";

const facts = [
  {
    en: "Registered",
    hi: "पंजीकृत",
    value: "U85500JH2025NPL024051",
  },
  {
    en: "Run by",
    hi: "संचालित",
    value: "Umanand Eastern Foundation",
  },
  {
    en: "Chairman",
    hi: "अध्यक्ष",
    value: "Shri Sanjeev Kumar",
  },
  {
    en: "Headquarters",
    hi: "मुख्यालय",
    value: "Umanand Auditorium, Diamond City, Oyna, Ranchi, Jharkhand 834001",
  },
];

export default function JoinPage() {
  return (
    <div className="pb-24">
      <header className="eidf-grain relative overflow-hidden text-white">
        <div className="absolute inset-0 eidf-depth" />
        <div className="relative z-10 mx-auto max-w-lg px-4 pb-10 pt-7">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="EIDF"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-white object-contain p-0.5 ring-2 ring-gold/70"
            />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-soft">
                Eastern India Development Forum
              </p>
              <p className="font-hi mt-0.5 text-sm font-semibold text-white/85">
                पूर्वी भारत विकास मंच
              </p>
            </div>
          </div>

          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-soft">
            Registered forum · U85500JH2025NPL024051
          </p>
          <h1 className="mt-3 font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight text-balance">
            The apex development forum for Eastern India.
          </h1>
          <p className="font-hi mt-3 text-lg font-bold leading-snug text-gold-soft">
            पूर्वी भारत का शीर्ष विकास मंच।
          </p>
          <p className="mt-5 text-sm leading-relaxed text-white/75">
            Your name is enough to join the work. Choose your language, then leave your name.
          </p>
          <p className="font-hi mt-1.5 text-sm font-medium leading-relaxed text-white/80">
            इस काम से जुड़ने के लिए आपका नाम काफ़ी है। भाषा चुनें, फिर अपना नाम लिखें।
          </p>

          <a href="#signup" className="btn-primary mt-6 min-h-12 w-full text-base">
            Join · जुड़ें
          </a>
        </div>
      </header>

      <main>
        <JoinSynopsis />

        <section className="border-y border-line bg-white" aria-labelledby="trust-heading">
          <div className="mx-auto max-w-lg px-4 py-8">
            <p className="section-eyebrow">Why this is real</p>
            <h2 id="trust-heading" className="mt-3 font-display text-2xl font-bold text-navy">
              A registered desk you can place
            </h2>
            <p className="font-hi mt-1 text-base font-semibold text-navy/80">
              एक पंजीकृत डेस्क, जिसका पता है
            </p>

            <dl className="mt-5 space-y-3">
              {facts.map((fact) => (
                <div key={fact.en} className="rounded-2xl border border-line bg-cream px-4 py-3">
                  <dt>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-label">
                      {fact.en}
                    </span>
                    <span className="font-hi mt-0.5 block text-sm font-semibold text-navy/70">
                      {fact.hi}
                    </span>
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold leading-relaxed text-navy">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              Offices also sit in Patna, Bhubaneswar, Kolkata, and Guwahati. The work covers Bihar, Jharkhand, Odisha, West Bengal, Assam, and the North East.
            </p>
            <p className="font-hi mt-1 text-sm font-medium leading-relaxed text-navy/75">
              पटना, भुवनेश्वर, कोलकाता और गुवाहाटी में भी कार्यालय हैं। काम बिहार, झारखंड, ओडिशा, पश्चिम बंगाल, असम और पूर्वोत्तर में है।
            </p>
          </div>
        </section>

        <section id="signup" className="scroll-mt-4 mx-auto max-w-lg px-4 py-8">
          <JoinForm />
        </section>

        <JoinGallery />
      </main>

      <footer className="border-t border-line bg-navy-deep text-white">
        <div className="mx-auto max-w-lg px-4 py-8 text-sm leading-relaxed text-white/70">
          <p className="font-display text-base font-bold text-white">Eastern India Development Forum</p>
          <p className="font-hi mt-1 text-white/80">पूर्वी भारत विकास मंच</p>
          <p className="mt-3">
            Umanand Auditorium, Diamond City, Oyna, Ranchi, Jharkhand 834001
          </p>
          <p className="mt-2 text-xs tracking-wide text-gold-soft">U85500JH2025NPL024051</p>
          <Link href="/" className="mt-4 inline-block font-semibold text-gold-soft">
            Full website · पूरी वेबसाइट
          </Link>
        </div>
      </footer>

      <JoinBar />
    </div>
  );
}
