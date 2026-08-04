"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Save, Trash2 } from "lucide-react";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import type { CmsNavItem } from "@/lib/cms/types";

const LOCATIONS: CmsNavItem["location"][] = ["header", "portal", "footer"];

export function CmsNavigationEditor() {
  const qc = useQueryClient();
  const [items, setItems] = useState<CmsNavItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["cms-navigation"],
    queryFn: async () => {
      const res = await fetch("/api/cms/navigation");
      if (!res.ok) throw new Error("Failed");
      return (await res.json()).navigation as CmsNavItem[];
    },
  });

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async (navigation: CmsNavItem[]) => {
      const res = await fetch("/api/cms/navigation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ navigation }),
      });
      if (!res.ok) throw new Error("Save failed");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-navigation"] });
      setMessage("Navigation saved.");
      setTimeout(() => setMessage(null), 2000);
    },
  });

  const addItem = (location: CmsNavItem["location"]) => {
    setItems((prev) => [
      ...prev,
      {
        id: `${location}-${Date.now()}`,
        location,
        label: "New link",
        href: "/",
        sort_order: prev.filter((i) => i.location === location).length,
        is_visible: true,
      },
    ]);
  };

  return (
    <div className="space-y-8">
      {LOCATIONS.map((location) => {
        const group = items
          .filter((i) => i.location === location)
          .sort((a, b) => a.sort_order - b.sort_order);
        return (
          <div
            key={location}
            className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold capitalize text-[var(--admin-text)]">
                {location} menu
              </h3>
              <button
                type="button"
                onClick={() => addItem(location)}
                className="inline-flex items-center gap-1 rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-xs font-bold"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {group.map((item) => (
                <div key={item.id} className="grid gap-2 md:grid-cols-[1fr_1fr_80px_auto]">
                  <input
                    className={adminFieldClass}
                    value={item.label}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((n) =>
                          n.id === item.id ? { ...n, label: e.target.value } : n
                        )
                      )
                    }
                  />
                  <input
                    className={adminFieldClass}
                    value={item.href}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((n) =>
                          n.id === item.id ? { ...n, href: e.target.value } : n
                        )
                      )
                    }
                  />
                  <input
                    type="number"
                    className={adminFieldClass}
                    value={item.sort_order}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((n) =>
                          n.id === item.id
                            ? { ...n, sort_order: Number(e.target.value) }
                            : n
                        )
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setItems((prev) => prev.filter((n) => n.id !== item.id))
                    }
                    className="rounded-lg border border-red-500/30 p-2 text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {message && <p className="text-sm text-emerald">{message}</p>}
      <button
        type="button"
        disabled={save.isPending || isLoading}
        onClick={() => save.mutate(items)}
        className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white"
      >
        <Save className="h-4 w-4" /> Save navigation
      </button>
    </div>
  );
}
