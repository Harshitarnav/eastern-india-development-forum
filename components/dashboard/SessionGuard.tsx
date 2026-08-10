"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { meRequest, logoutRequest } from "@/lib/auth/client";
import { useAppDispatch } from "@/lib/store/hooks";
import { clearUser, setUser } from "@/lib/store/auth-slice";
import { SESSION_IDLE_TTL } from "@/lib/auth/constants";
import { GlobalLoader } from "@/components/loading/GlobalLoader";

export function SessionGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const lastActive = useRef(Date.now());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const user = await meRequest();
        if (cancelled) return;
        if (!user) {
          // Clear stale refresh cookies so proxy doesn't bounce login → dashboard
          await logoutRequest();
          if (cancelled) return;
          dispatch(clearUser());
          router.replace("/admin/login");
          return;
        }
        dispatch(setUser(user));
        setReady(true);
      } catch {
        if (cancelled) return;
        await logoutRequest().catch(() => undefined);
        if (cancelled) return;
        dispatch(clearUser());
        router.replace("/admin/login");
      }
    }

    hydrate();
    return () => {
      cancelled = true;
    };
  }, [dispatch, router]);

  useEffect(() => {
    const bump = () => {
      lastActive.current = Date.now();
    };
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, bump, { passive: true }));

    const timer = window.setInterval(async () => {
      if (Date.now() - lastActive.current > SESSION_IDLE_TTL * 1000) {
        await logoutRequest();
        dispatch(clearUser());
        router.replace("/admin/login?reason=idle");
      }
    }, 30_000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, bump));
      window.clearInterval(timer);
    };
  }, [dispatch, router]);

  if (!ready) {
    return (
      <GlobalLoader
        visible
        message="Loading your session…"
        tagline="Please wait a moment"
      />
    );
  }

  return <>{children}</>;
}
