import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-navy-deep px-6 pb-7 pt-10 text-white md:px-12 md:pt-14">
      <div className="mx-auto grid max-w-6xl gap-8 border-b border-white/15 pb-7 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-3.5 flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-navy">
              EI
            </div>
            <span className="font-display text-base font-bold leading-snug">
              Eastern India Development Forum
            </span>
          </div>
          <p className="mb-4 max-w-xs text-[13px] leading-relaxed text-white/70">
            An initiative of Umanand Eastern Foundation, uniting the global Eastern-India
            community to fund skill, heritage & development projects back home.
          </p>
          <div className="flex gap-2.5">
            {["in", "fb", "ig", "x"].map((s) => (
              <span
                key={s}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-mid text-[11px] uppercase"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 text-xs tracking-[1.5px] text-gold">EXPLORE</div>
          <div className="flex flex-col gap-3 text-sm text-white/85">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/events">Events & News</Link>
          </div>
        </div>

        <div>
          <div className="mb-4 text-xs tracking-[1.5px] text-gold">GET INVOLVED</div>
          <div className="flex flex-col gap-3 text-sm text-white/85">
            <Link href="/membership">Join as a Member</Link>
            <Link href="/contact?intent=donate">Donate</Link>
            <Link href="/contact">Volunteer</Link>
          </div>
        </div>

        <div>
          <div className="mb-4 text-xs tracking-[1.5px] text-gold">CONTACT</div>
          <div className="text-[13px] leading-relaxed text-white/80">
            {site.address.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <div className="mt-2.5 text-[13px] text-white/80">{site.email}</div>
          <div className="text-[13px] text-white/80">{site.phone}</div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 pt-5 text-xs text-white/50">
        <span>
          © {new Date().getFullYear()} Eastern India Development Forum · An initiative of
          Umanand Eastern Foundation
        </span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}
