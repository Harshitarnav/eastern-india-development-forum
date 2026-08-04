"use client";

import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Search, Eye, EyeOff, Save, X } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import { cn } from "@/lib/utils";

export type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "checkbox";
  options?: { label: string; value: string }[];
  required?: boolean;
  placeholder?: string;
};

type ItemRecord = {
  id: string;
  collection: string;
  data: Record<string, unknown>;
  sort_order: number;
  is_published: boolean;
  slug?: string | null;
};

async function fetchItems(collection: string): Promise<ItemRecord[]> {
  const res = await fetch(`/api/cms/items?collection=${encodeURIComponent(collection)}`);
  if (!res.ok) throw new Error("Failed to load");
  const json = await res.json();
  return json.items || [];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CmsCollectionPage({
  title,
  description,
  collection,
  fields,
  titleKey = "title",
  subtitleKey,
}: {
  title: string;
  description?: string;
  collection: string;
  fields: FieldDef[];
  titleKey?: string;
  subtitleKey?: string;
}) {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<ItemRecord | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [published, setPublished] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["cms-items", collection],
    queryFn: () => fetchItems(collection),
  });

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) =>
      JSON.stringify(item.data).toLowerCase().includes(needle)
    );
  }, [items, q]);

  const saveMutation = useMutation({
    mutationFn: async (payload: ItemRecord) => {
      const res = await fetch(
        `/api/cms/items/${encodeURIComponent(collection)}/${encodeURIComponent(payload.id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Save failed");
      }
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-items", collection] });
      setEditing(null);
      setCreating(false);
      setError(null);
    },
    onError: (err: Error) => setError(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `/api/cms/items/${encodeURIComponent(collection)}/${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-items", collection] }),
  });

  const openCreate = () => {
    const blank: Record<string, unknown> = {};
    for (const f of fields) blank[f.key] = f.type === "checkbox" ? false : "";
    setForm(blank);
    setPublished(true);
    setCreating(true);
    setEditing(null);
    setError(null);
  };

  const openEdit = (item: ItemRecord) => {
    setForm({ ...item.data });
    setPublished(item.is_published !== false);
    setEditing(item);
    setCreating(false);
    setError(null);
  };

  const handleSave = () => {
    const titleVal = String(form[titleKey] || form.name || form.label || "item");
    for (const field of fields) {
      if (field.required && !String(form[field.key] ?? "").trim()) {
        setError(`${field.label} is required`);
        return;
      }
    }
    const id =
      editing?.id ||
      (typeof form.id === "string" && form.id) ||
      `${collection}-${slugify(titleVal)}-${Date.now().toString(36)}`;
    const { id: _omit, ...data } = form;
    void _omit;
    saveMutation.mutate({
      id,
      collection,
      data,
      sort_order: editing?.sort_order ?? items.length,
      is_published: published,
      slug: slugify(titleVal),
    });
  };

  const drawerOpen = creating || Boolean(editing);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--admin-text)] md:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">
            {description ?? `Manage ${title.toLowerCase()} for the public website.`}
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-bold text-navy shadow-sm hover:brightness-105"
        >
          <Plus className="h-4 w-4" /> Create
        </button>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          className={cn(adminFieldClass, "pl-10")}
        />
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-8 text-sm text-[var(--admin-muted)]">
          Loading…
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title={`No ${title.toLowerCase()} yet`}
          description="Create the first item to publish it on the public site."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--admin-border)] bg-[var(--admin-bg)]/50 text-xs uppercase tracking-wide text-[var(--admin-muted)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Item</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[var(--admin-border)]/70 last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[var(--admin-text)]">
                      {String(
                        item.data[titleKey] ||
                          item.data.name ||
                          item.data.label ||
                          item.id
                      )}
                    </div>
                    {subtitleKey && item.data[subtitleKey] != null && (
                      <div className="mt-0.5 text-xs text-[var(--admin-muted)] line-clamp-1">
                        {String(item.data[subtitleKey])}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold",
                        item.is_published
                          ? "bg-emerald/10 text-emerald"
                          : "bg-[var(--admin-bg)] text-[var(--admin-muted)]"
                      )}
                    >
                      {item.is_published ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3" />
                      )}
                      {item.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => openEdit(item)}
                      className="mr-2 inline-flex rounded-lg border border-[var(--admin-border)] p-2 text-[var(--admin-text)] hover:bg-[var(--admin-bg)]"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Delete this item?")) deleteMutation.mutate(item.id);
                      }}
                      className="inline-flex rounded-lg border border-red-500/30 p-2 text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="flex h-full w-full max-w-lg flex-col border-l border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-5 py-4">
              <h2 className="font-display text-lg font-bold text-[var(--admin-text)]">
                {creating ? "Create item" : "Edit item"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setCreating(false);
                  setEditing(null);
                }}
                className="rounded-lg p-2 hover:bg-[var(--admin-bg)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <AdminFieldLabel>{field.label}</AdminFieldLabel>
                  {field.type === "textarea" ? (
                    <textarea
                      className={cn(adminFieldClass, "min-h-28")}
                      value={String(form[field.key] ?? "")}
                      placeholder={field.placeholder}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                    />
                  ) : field.type === "select" ? (
                    <select
                      className={adminFieldClass}
                      value={String(form[field.key] ?? "")}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                    >
                      <option value="">Select…</option>
                      {(field.options || []).map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <label className="mt-2 flex items-center gap-2 text-sm text-[var(--admin-text)]">
                      <input
                        type="checkbox"
                        checked={Boolean(form[field.key])}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            [field.key]: e.target.checked,
                          }))
                        }
                      />
                      Enabled
                    </label>
                  ) : (
                    <input
                      type={field.type === "number" ? "number" : "text"}
                      className={adminFieldClass}
                      value={String(form[field.key] ?? "")}
                      placeholder={field.placeholder}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          [field.key]:
                            field.type === "number"
                              ? Number(e.target.value)
                              : e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
              ))}
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--admin-text)]">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                Published on public site
              </label>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <div className="border-t border-[var(--admin-border)] px-5 py-4">
              <button
                type="button"
                onClick={handleSave}
                disabled={saveMutation.isPending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white hover:brightness-110 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saveMutation.isPending
                  ? "Saving…"
                  : saveMutation.isSuccess
                    ? "Saved ✓"
                    : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
