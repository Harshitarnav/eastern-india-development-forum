import type { Metadata } from "next";
import { Suspense } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { LoginHeroPanel } from "@/components/auth/LoginHeroPanel";
import { LoginForm } from "@/components/auth/LoginForm";
import { ForceLightTheme } from "@/components/auth/ForceLightTheme";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Secure admin access to the Eastern India Development Forum CMS.",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7fafc] lg:flex-row">
      <ForceLightTheme />
      <LoginHeroPanel />

      <section className="relative flex w-full flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:w-[52%] lg:min-h-screen lg:px-10 xl:w-[50%] xl:px-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.12),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1),transparent_40%),radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_50%)]" />

        <div className="relative w-full max-w-[420px]">
          {/* Mobile brand header */}
          <div className="mb-7 flex items-center gap-3 lg:hidden">
            <BrandLogo size="lg" className="shadow-md" priority />
            <div>
              <div className="font-display text-base font-bold text-navy">
                Eastern India Development Forum
              </div>
              <div className="text-[11px] text-muted">
                Building the Future of Eastern India
              </div>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="h-[420px] animate-pulse rounded-3xl border border-line bg-white" />
            }
          >
            <LoginForm />
          </Suspense>

          <p className="mt-6 text-center text-[11px] text-muted lg:hidden">
            © {new Date().getFullYear()} EIDF · Authorized Access Only
          </p>
        </div>
      </section>
    </div>
  );
}
