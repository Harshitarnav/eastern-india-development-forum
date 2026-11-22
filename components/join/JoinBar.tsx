"use client";

import { useEffect, useState } from "react";

export function JoinBar() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const form = document.getElementById("signup");
    if (!form) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHide(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  if (hide) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-navy/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md">
      <a href="#signup" className="btn-primary min-h-12 w-full text-base">
        Join · जुड़ें
      </a>
    </div>
  );
}
