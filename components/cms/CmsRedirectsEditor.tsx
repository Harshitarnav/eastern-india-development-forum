"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Save, Trash2 } from "lucide-react";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import type { CmsRedirect } from "@/lib/cms/types";

function newId() {
  return `redir-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function CmsRedirectsEditor() {
  const qc = useQueryClient();
  const [items, setItems] = useState<CmsRedirect[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["cms-redirects"],
    queryFn: async () => {
      const res = await fetch("/api/cms/redirects");
      if (!res.ok) throw new Error("Failed");
      return (await res.json()).redirects as CmsRedirect[];
    },
  });

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async (redirects: CmsRedirect[]) => {
      const res = await fetch("/api/cms/redirects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ redirects }),
      });
      if (!res.ok) throw new Error("Save failed");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-redirects"] });
      setMessage("Redirects saved.");
      setTimeout(() => setMessage(null), 2000);
    },
  });

  return (
    <div className="space-y-4 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
            Redirects
          </h3>
          <p className="text-xs text-[var(--admin-muted)]">
            301/302 path redirects applied on the public site.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setItems((prev) => [
              ...prev,
              {
                id: newId(),
                from_path: "/old-path",
                to_path: "/",
                status_code: 301,
                is_active: true,
              },
            ])
          }
          className="inline-flex items-center gap-1 rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-xs font-bold"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-[var(--admin-muted)]">Loading…</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid gap-2 md:grid-cols-[1fr_1fr_100px_auto]"
            >
              <div>
                <AdminFieldLabel>From</AdminFieldLabel>
                <input
                  className={adminFieldClass}
                  value={item.from_path}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((r) =>
                        r.id === item.id
                          ? { ...r, from_path: e.target.value }
                          : r
                      )
                    )
                  }
                />
              </div>
              <div>
                <AdminFieldLabel>To</AdminFieldLabel>
                <input
                  className={adminFieldClass}
                  value={item.to_path}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((r) =>
                        r.id === item.id ? { ...r, to_path: e.target.value } : r
                      )
                    )
                  }
                />
              </div>
              <div>
                <AdminFieldLabel>Code</AdminFieldLabel>
                <select
                  className={adminFieldClass}
                  value={item.status_code}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((r) =>
                        r.id === item.id
                          ? { ...r, status_code: Number(e.target.value) }
                          : r
                      )
                    )
                  }
                >
                  <option value={301}>301</option>
                  <option value={302}>302</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() =>
                    setItems((prev) => prev.filter((r) => r.id !== item.id))
                  }
                  className="rounded-lg border border-red-500/30 p-2 text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {message && <p className="text-sm text-emerald">{message}</p>}
      <button
        type="button"
        disabled={save.isPending}
        onClick={() => save.mutate(items)}
        className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white"
      >
        <Save className="h-4 w-4" /> Save redirects
      </button>
    </div>
  );
}
