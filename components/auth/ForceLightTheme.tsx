"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

/** Keep the login experience light and brand-aligned. */
export function ForceLightTheme() {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const previous = resolvedTheme;
    setTheme("light");
    return () => {
      if (previous && previous !== "light") {
        setTheme(previous);
      }
    };
    // Intentionally run once on mount/unmount for this page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
