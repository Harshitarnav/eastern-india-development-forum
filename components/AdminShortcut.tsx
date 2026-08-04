"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

export function AdminShortcut() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || !event.shiftKey || event.key.toLowerCase() !== "a") return;
      if (isTypingTarget(event.target)) return;

      event.preventDefault();

      if (pathname.startsWith("/admin")) {
        router.push("/");
        return;
      }

      router.push("/admin/dashboard");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pathname, router]);

  return null;
}
