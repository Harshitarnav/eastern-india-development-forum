"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mail, Users, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "membership" | "contact";

export function CmsFormsInbox() {
  const [tab, setTab] = useState<Tab>("membership");
  const qc = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cms-forms", tab],
    queryFn: async () => {
      const res = await fetch(`/api/cms/forms/${tab}`);
      if (!res.ok) throw new Error("Failed to load");
      return res.json() as Promise<{
        rows: Record<string, unknown>[];
        source: string;
        message?: string;
      }>;
    },
  });

  const patchStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/cms/forms/${tab}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Update failed");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-forms", tab] }),
  });

  const rows = data?.rows || [];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--admin-text)] md:text-3xl">
            Forms inbox
          </h1>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">
            Membership applications and contact messages from the public site.
          </p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--admin-border)] px-3 py-2 text-sm font-semibold"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      <div className="flex gap-2">
        {(
          [
            { id: "membership" as const, label: "Membership", icon: Users },
            { id: "contact" as const, label: "Contact", icon: Mail },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold",
              tab === t.id
                ? "bg-gold/15 text-gold"
                : "border border-[var(--admin-border)] text-[var(--admin-text)]"
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {data?.message && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          {data.message}
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-[var(--admin-muted)]">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-10 text-center text-sm text-[var(--admin-muted)]">
          No submissions yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--admin-border)] text-xs uppercase text-[var(--admin-muted)]">
              <tr>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={String(row.id)} className="border-b border-[var(--admin-border)]/60">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[var(--admin-text)]">
                      {String(row.full_name || "")}
                    </div>
                    <div className="text-xs text-[var(--admin-muted)]">
                      {String(row.email || "")}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--admin-muted)]">
                    <div className="line-clamp-2">
                      {String(
                        row.subject ||
                          row.contribution_type ||
                          row.message ||
                          "—"
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className="rounded-lg border border-[var(--admin-border)] bg-transparent px-2 py-1 text-xs"
                      value={String(row.status || "new")}
                      onChange={(e) =>
                        patchStatus.mutate({
                          id: String(row.id),
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--admin-muted)]">
                    {row.created_at
                      ? new Date(String(row.created_at)).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
