"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";

function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-gold font-display font-bold text-navy"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      EI
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy text-white">
      <div className="mx-auto flex h-16 items-center justify-between px-5 md:h-[84px] md:px-12">
        <Link href="/" className="flex items-center gap-2 md:gap-3" onClick={() => setOpen(false)}>
          <LogoMark size={34} />
          <div className="hidden leading-tight sm:block md:leading-[1.15]">
            <div className="font-display text-sm font-bold tracking-wide md:text-[17px]">
              Eastern India
            </div>
            <div className="hidden text-[10px] tracking-[2.5px] text-gold md:block">
              DEVELOPMENT FORUM
            </div>
          </div>
          <span className="font-display text-sm font-bold sm:hidden">Eastern India</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap text-[15px] transition-colors ${
                  active ? "font-bold text-gold" : "font-medium text-white/85 hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact?intent=donate"
            className="rounded-full border border-white/25 px-5 py-2.5 text-sm text-white transition-colors hover:border-gold hover:text-gold"
          >
            Donate
          </Link>
          <Link
            href="/membership"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy transition-opacity hover:opacity-90"
          >
            Join Us
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-white px-5 py-5 text-ink lg:hidden">
          <div className="flex flex-col gap-4">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/membership"
              className="mt-2 rounded-full bg-gold py-3 text-center text-sm font-bold text-navy"
              onClick={() => setOpen(false)}
            >
              Join Us
            </Link>
            <Link
              href="/contact?intent=donate"
              className="rounded-full border border-line py-3 text-center text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
