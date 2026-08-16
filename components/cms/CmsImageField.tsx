"use client";

import React, { useRef, useState } from "react";
import { ImagePlus, Link2, Loader2, Upload } from "lucide-react";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import { cn } from "@/lib/utils";

type CmsImageFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  folder?: string;
  className?: string;
  /** Logo-style preview (contain + square) vs wide media (contain in banner). */
  preview?: "logo" | "media";
};

export function isCmsImageFieldKey(key: string) {
  return /^(src|image|photo|avatar|banner|thumbnail|cover|poster|og_image|twitter_image|logo)$/i.test(
    key
  );
}

export function CmsImageField({
  label,
  value,
  onChange,
  required,
  placeholder = "/images/example.jpg",
  folder = "general",
  className,
  preview = "media",
}: CmsImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [broken, setBroken] = useState(false);
  const isLogo = preview === "logo" || /logo/i.test(label);

  const upload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("alt", file.name.replace(/\.[^.]+$/, "") || label);
      fd.set("folder", folder);
      const res = await fetch("/api/cms/media", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Upload failed");
      const url = json.media?.url as string | undefined;
      if (!url) throw new Error("Upload succeeded but no URL returned");
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <AdminFieldLabel>
        {label}
        {required ? " *" : ""}
      </AdminFieldLabel>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="relative">
          <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" />
          <input
            className={cn(adminFieldClass, "pl-10")}
            value={value}
            required={required}
            placeholder={placeholder}
            onChange={(e) => {
              setError(null);
              setBroken(false);
              onChange(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)] px-4 py-2.5 text-sm font-bold text-[var(--admin-text)] hover:bg-[var(--admin-surface-2)] disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4 text-gold" />
          )}
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
        }}
      />

      <p className="text-[11px] text-[var(--admin-muted)]">
        Paste a path (e.g. <code className="text-gold">/images/eidf_15.jpeg</code>) or upload an image file.
      </p>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {value ? (
        <div className="overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)]">
          <div
            className={cn(
              "flex items-center justify-center bg-[repeating-conic-gradient(#e8e8e8_0%_25%,#f6f6f6_0%_50%)] bg-[length:16px_16px] dark:bg-[repeating-conic-gradient(#2a2a2a_0%_25%,#1f1f1f_0%_50%)]",
              isLogo ? "h-40 p-4" : "h-44 p-3"
            )}
          >
            {broken ? (
              <p className="text-sm text-[var(--admin-muted)]">Image failed to load</p>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={value}
                src={value}
                alt={label}
                className={cn(
                  "max-h-full object-contain",
                  isLogo ? "max-w-[10rem] rounded-full bg-white p-1 shadow-sm" : "max-w-full"
                )}
                onLoad={() => setBroken(false)}
                onError={() => setBroken(true)}
              />
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 text-[11px] text-[var(--admin-muted)]">
            <ImagePlus className="h-3.5 w-3.5 text-gold" />
            <span className="truncate">{value}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
