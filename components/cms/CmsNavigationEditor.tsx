"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  LayoutTemplate,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import { CmsImageField } from "@/components/cms/CmsImageField";
import type { CmsHeaderLayout, CmsNavItem, CmsSettings } from "@/lib/cms/types";
import { DEFAULT_HEADER_LAYOUT } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

const LOCATIONS: CmsNavItem["location"][] = ["header", "portal", "footer"];

export function CmsNavigationEditor() {
  const qc = useQueryClient();
  const [items, setItems] = useState<CmsNavItem[]>([]);
  const [layout, setLayout] = useState<CmsHeaderLayout>(DEFAULT_HEADER_LAYOUT);
  const [logo, setLogo] = useState("/images/logo.png");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["cms-navigation"],
    queryFn: async () => {
      const res = await fetch("/api/cms/navigation");
      if (!res.ok) throw new Error("Failed");
      return (await res.json()).navigation as CmsNavItem[];
    },
  });

  const { data: settingsData } = useQuery({
    queryKey: ["cms-settings"],
    queryFn: async () => {
      const res = await fetch("/api/cms/settings");
      if (!res.ok) throw new Error("Failed");
      return (await res.json()).settings as CmsSettings;
    },
  });

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  useEffect(() => {
    if (settingsData?.headerLayout) {
      setLayout({ ...DEFAULT_HEADER_LAYOUT, ...settingsData.headerLayout });
    }
    if (settingsData?.logo) {
      setLogo(settingsData.logo);
    }
  }, [settingsData]);

  const saveNav = useMutation({
    mutationFn: async (navigation: CmsNavItem[]) => {
      const res = await fetch("/api/cms/navigation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ navigation }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Navigation save failed");
      return json;
    },
  });

  const saveLayout = useMutation({
    mutationFn: async (payload: {
      headerLayout: CmsHeaderLayout;
      logo: string;
    }) => {
      const res = await fetch("/api/cms/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Header layout save failed");
      return json;
    },
  });

  const saveAll = async () => {
    setError(null);
    try {
      // Sequential writes — parallel saves raced on the same store.json
      await saveNav.mutateAsync(items);
      await saveLayout.mutateAsync({ headerLayout: layout, logo });
      qc.invalidateQueries({ queryKey: ["cms-navigation"] });
      qc.invalidateQueries({ queryKey: ["cms-settings"] });
      setMessage("Header layout & navigation saved.");
      setTimeout(() => setMessage(null), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

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

  const moveItem = (id: string, direction: -1 | 1) => {
    setItems((prev) => {
      const item = prev.find((n) => n.id === id);
      if (!item) return prev;

      const group = prev
        .filter((n) => n.location === item.location)
        .sort((a, b) => {
          const byOrder = a.sort_order - b.sort_order;
          if (byOrder !== 0) return byOrder;
          return a.id.localeCompare(b.id);
        });

      const idx = group.findIndex((n) => n.id === id);
      const nextIdx = idx + direction;
      if (idx < 0 || nextIdx < 0 || nextIdx >= group.length) return prev;

      const reordered = [...group];
      const [moved] = reordered.splice(idx, 1);
      reordered.splice(nextIdx, 0, moved);

      const orderById = new Map(
        reordered.map((n, i) => [n.id, i] as const)
      );

      return prev.map((n) => {
        const nextOrder = orderById.get(n.id);
        return nextOrder === undefined ? n : { ...n, sort_order: nextOrder };
      });
    });
  };

  const pending = saveNav.isPending || saveLayout.isPending;

  return (
    <div className="space-y-8">
      {/* Header layout / alignment / sections */}
      <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 space-y-5">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="h-5 w-5 text-gold" />
          <div>
            <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
              Header layout
            </h3>
            <p className="text-xs text-[var(--admin-muted)]">
              Control menu alignment and which header sections are shown.
            </p>
          </div>
        </div>

        <CmsImageField
          label="Header / site logo"
          value={logo}
          folder="brand"
          preview="logo"
          placeholder="/images/logo.png"
          onChange={setLogo}
        />

        <div>
          <AdminFieldLabel>Menu alignment</AdminFieldLabel>
          <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
            {(
              [
                ["left", "Left"],
                ["center", "Center"],
                ["right", "Right"],
                ["between", "Space between"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setLayout((prev) => ({ ...prev, menuAlign: value }))}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-xs font-bold",
                  layout.menuAlign === value
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-[var(--admin-border)] text-[var(--admin-text)]"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <AdminFieldLabel>Header sections</AdminFieldLabel>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {(
              [
                ["showTopBar", "Top utility bar (reg / phone / email)"],
                ["showBrandText", "Brand text beside logo"],
                ["showSearch", "Search button"],
                ["showCta", "CTA button"],
                ["showPortalsDropdown", "Portals dropdown"],
                ["sticky", "Sticky header"],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center gap-2 rounded-xl border border-[var(--admin-border)] px-3 py-2.5 text-sm text-[var(--admin-text)]"
              >
                <input
                  type="checkbox"
                  checked={Boolean(layout[key])}
                  onChange={(e) =>
                    setLayout((prev) => ({ ...prev, [key]: e.target.checked }))
                  }
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <AdminFieldLabel>Brand text mode</AdminFieldLabel>
            <select
              className={adminFieldClass}
              value={layout.brandTextMode}
              onChange={(e) =>
                setLayout((prev) => ({
                  ...prev,
                  brandTextMode: e.target.value as CmsHeaderLayout["brandTextMode"],
                }))
              }
            >
              <option value="full">Full name</option>
              <option value="short">Short name (EIDF)</option>
            </select>
          </div>
          <div>
            <AdminFieldLabel>Portals dropdown position</AdminFieldLabel>
            <select
              className={adminFieldClass}
              value={layout.portalsPosition}
              onChange={(e) =>
                setLayout((prev) => ({
                  ...prev,
                  portalsPosition: e.target
                    .value as CmsHeaderLayout["portalsPosition"],
                }))
              }
            >
              <option value="after-primary">After first half of links</option>
              <option value="before-cta">Before CTA / actions</option>
              <option value="end">At end of menu</option>
            </select>
          </div>
          <div>
            <AdminFieldLabel>Portals label</AdminFieldLabel>
            <input
              className={adminFieldClass}
              value={layout.portalsLabel}
              onChange={(e) =>
                setLayout((prev) => ({ ...prev, portalsLabel: e.target.value }))
              }
            />
          </div>
          <div>
            <AdminFieldLabel>CTA label</AdminFieldLabel>
            <input
              className={adminFieldClass}
              value={layout.ctaLabel}
              onChange={(e) =>
                setLayout((prev) => ({ ...prev, ctaLabel: e.target.value }))
              }
            />
          </div>
          <div className="md:col-span-2">
            <AdminFieldLabel>CTA link</AdminFieldLabel>
            <input
              className={adminFieldClass}
              value={layout.ctaHref}
              onChange={(e) =>
                setLayout((prev) => ({ ...prev, ctaHref: e.target.value }))
              }
              placeholder="/membership"
            />
          </div>
        </div>
      </div>

      {/* Menu link sections */}
      {LOCATIONS.map((location) => {
        const group = items
          .filter((i) => i.location === location)
          .sort((a, b) => {
            const byOrder = a.sort_order - b.sort_order;
            if (byOrder !== 0) return byOrder;
            return a.id.localeCompare(b.id);
          });
        return (
          <div
            key={location}
            className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold capitalize text-[var(--admin-text)]">
                  {location} menu
                </h3>
                <p className="text-xs text-[var(--admin-muted)]">
                  Reorder items and edit labels, links, and visibility.
                </p>
              </div>
              <button
                type="button"
                onClick={() => addItem(location)}
                className="inline-flex items-center gap-1 rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-xs font-bold"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {group.map((item, index) => (
                <div
                  key={item.id}
                  className="grid gap-2 rounded-xl border border-[var(--admin-border)] p-3 md:grid-cols-[1fr_1fr_auto]"
                >
                  <input
                    className={adminFieldClass}
                    value={item.label}
                    placeholder="Label"
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
                    placeholder="/path"
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((n) =>
                          n.id === item.id ? { ...n, href: e.target.value } : n
                        )
                      )
                    }
                  />
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Move up"
                      disabled={index === 0}
                      onClick={() => moveItem(item.id, -1)}
                      className="rounded-lg border border-[var(--admin-border)] p-2 disabled:opacity-40"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title="Move down"
                      disabled={index === group.length - 1}
                      onClick={() => moveItem(item.id, 1)}
                      className="rounded-lg border border-[var(--admin-border)] p-2 disabled:opacity-40"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title={item.is_visible ? "Hide" : "Show"}
                      onClick={() =>
                        setItems((prev) =>
                          prev.map((n) =>
                            n.id === item.id
                              ? { ...n, is_visible: !n.is_visible }
                              : n
                          )
                        )
                      }
                      className="rounded-lg border border-[var(--admin-border)] p-2"
                    >
                      {item.is_visible !== false ? (
                        <Eye className="h-4 w-4 text-emerald" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-[var(--admin-muted)]" />
                      )}
                    </button>
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
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {message && <p className="text-sm text-emerald">{message}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="button"
        disabled={pending || isLoading}
        onClick={() => void saveAll()}
        className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
      >
        <Save className="h-4 w-4" />
        {pending ? "Saving…" : "Save header & navigation"}
      </button>
    </div>
  );
}
