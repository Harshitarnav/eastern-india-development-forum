"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Save, Search } from "lucide-react";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import { CmsImageField } from "@/components/cms/CmsImageField";
import { cn } from "@/lib/utils";
import type { CmsSeoRecord } from "@/lib/cms/types";

async function fetchSeo(): Promise<CmsSeoRecord[]> {
  const res = await fetch("/api/cms/seo");
  if (!res.ok) throw new Error("Failed to load SEO");
  const json = await res.json();
  return json.seo || [];
}

export function CmsSeoManager() {
  const qc = useQueryClient();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [form, setForm] = useState<CmsSeoRecord | null>(null);
  const [q, setQ] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["cms-seo"],
    queryFn: fetchSeo,
  });

  useEffect(() => {
    if (!selectedPath && rows[0]) {
      setSelectedPath(rows[0].path);
      setForm(rows[0]);
    }
  }, [rows, selectedPath]);

  const save = useMutation({
    mutationFn: async (record: CmsSeoRecord) => {
      const res = await fetch("/api/cms/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error("Save failed");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-seo"] });
      setMessage("SEO saved. Public pages will refresh.");
      setTimeout(() => setMessage(null), 2500);
    },
  });

  const filtered = rows.filter((r) =>
    r.path.toLowerCase().includes(q.trim().toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--admin-text)] md:text-3xl">
          SEO
        </h1>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Titles, descriptions, Open Graph, robots, and canonical URLs per path.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-3">
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--admin-muted)]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter paths"
              className={cn(adminFieldClass, "pl-9 text-sm")}
            />
          </div>
          <div className="max-h-[60vh] space-y-1 overflow-y-auto">
            {isLoading && (
              <p className="px-2 py-3 text-sm text-[var(--admin-muted)]">Loading…</p>
            )}
            {filtered.map((row) => (
              <button
                key={row.path}
                type="button"
                onClick={() => {
                  setSelectedPath(row.path);
                  setForm(row);
                }}
                className={cn(
                  "block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition",
                  selectedPath === row.path
                    ? "bg-gold/15 text-gold"
                    : "text-[var(--admin-text)] hover:bg-[var(--admin-bg)]"
                )}
              >
                {row.path}
                {row.noindex && (
                  <span className="ml-2 text-[10px] uppercase text-red-500">noindex</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {form && (
          <div className="space-y-4 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5">
            <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)]/40 p-4">
              <div className="text-xs text-emerald">eidf.org.in{form.path}</div>
              <div className="mt-1 text-lg font-semibold text-sky-700 dark:text-sky-300">
                {form.title || "Untitled"}
              </div>
              <div className="mt-1 line-clamp-2 text-sm text-[var(--admin-muted)]">
                {form.description || "No description"}
              </div>
            </div>

            {(
              [
                ["title", "Title"],
                ["description", "Description"],
                ["canonical", "Canonical URL"],
                ["og_title", "OG Title"],
                ["og_description", "OG Description"],
                ["og_image", "OG Image"],
                ["twitter_title", "Twitter Title"],
                ["twitter_description", "Twitter Description"],
                ["twitter_image", "Twitter Image"],
                ["robots", "Robots"],
              ] as const
            ).map(([key, label]) =>
              key === "og_image" || key === "twitter_image" ? (
                <CmsImageField
                  key={key}
                  label={label}
                  value={String(form[key] ?? "")}
                  folder="seo"
                  placeholder="/images/hero-banner.jpg"
                  onChange={(next) =>
                    setForm((prev) => (prev ? { ...prev, [key]: next } : prev))
                  }
                />
              ) : (
                <div key={key}>
                  <AdminFieldLabel>{label}</AdminFieldLabel>
                  {key.includes("description") ? (
                    <textarea
                      className={cn(adminFieldClass, "min-h-24")}
                      value={String(form[key] ?? "")}
                      onChange={(e) =>
                        setForm((prev) =>
                          prev ? { ...prev, [key]: e.target.value } : prev
                        )
                      }
                    />
                  ) : (
                    <input
                      className={adminFieldClass}
                      value={String(form[key] ?? "")}
                      onChange={(e) =>
                        setForm((prev) =>
                          prev ? { ...prev, [key]: e.target.value } : prev
                        )
                      }
                    />
                  )}
                </div>
              )
            )}

            <label className="flex items-center gap-2 text-sm font-semibold text-[var(--admin-text)]">
              <input
                type="checkbox"
                checked={Boolean(form.noindex)}
                onChange={(e) =>
                  setForm((prev) =>
                    prev ? { ...prev, noindex: e.target.checked } : prev
                  )
                }
              />
              Noindex this path
            </label>

            {message && <p className="text-sm text-emerald">{message}</p>}

            <button
              type="button"
              disabled={save.isPending}
              onClick={() => form && save.mutate(form)}
              className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white"
            >
              <Save className="h-4 w-4" />
              {save.isPending ? "Saving…" : "Save SEO"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
