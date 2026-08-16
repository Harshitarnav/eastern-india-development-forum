"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Save } from "lucide-react";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import type { CmsMediaRecord } from "@/lib/cms/types";

async function fetchMedia(): Promise<CmsMediaRecord[]> {
  const res = await fetch("/api/cms/media");
  if (!res.ok) throw new Error("Failed");
  const json = await res.json();
  return json.media || [];
}

export function CmsMediaLibrary() {
  const qc = useQueryClient();
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [folder, setFolder] = useState("general");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: media = [], isLoading } = useQuery({
    queryKey: ["cms-media"],
    queryFn: fetchMedia,
  });

  const register = useMutation({
    mutationFn: async () => {
      if (file) {
        const fd = new FormData();
        fd.set("file", file);
        fd.set("alt", alt);
        fd.set("folder", folder);
        const res = await fetch("/api/cms/media", { method: "POST", body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Upload failed");
        return json;
      }
      const res = await fetch("/api/cms/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, alt, folder }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Register failed");
      return json;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-media"] });
      setUrl("");
      setAlt("");
      setFile(null);
      setError(null);
    },
    onError: (err: Error) => setError(err.message),
  });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-[var(--admin-text)]">
          <ImagePlus className="h-5 w-5 text-gold" /> Add media
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <AdminFieldLabel>Path / public URL</AdminFieldLabel>
            <input
              className={adminFieldClass}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="/images/hero-banner.jpg"
            />
          </div>
          <div>
            <AdminFieldLabel>Upload file (local or Supabase)</AdminFieldLabel>
            <input
              type="file"
              accept="image/*,application/pdf"
              className={adminFieldClass}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <div>
            <AdminFieldLabel>Alt text (required)</AdminFieldLabel>
            <input
              className={adminFieldClass}
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
            />
          </div>
          <div>
            <AdminFieldLabel>Folder</AdminFieldLabel>
            <input
              className={adminFieldClass}
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
            />
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        <button
          type="button"
          disabled={register.isPending || !alt.trim() || (!url && !file)}
          onClick={() => register.mutate()}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {register.isPending ? "Saving…" : "Add to library"}
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-[var(--admin-muted)]">Loading media…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((m) => (
            <div
              key={m.id}
              className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt={m.alt} className="h-36 w-full object-cover bg-[var(--admin-bg)]" />
              <div className="space-y-1 p-3">
                <div className="text-sm font-semibold text-[var(--admin-text)] line-clamp-1">
                  {m.title || m.alt}
                </div>
                <div className="text-xs text-[var(--admin-muted)] line-clamp-1">{m.url}</div>
                <div className="text-[10px] uppercase tracking-wide text-gold">
                  {m.folder || "general"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
