"use client";

import React from "react";
import { Save } from "lucide-react";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import { cn } from "@/lib/utils";

export type HeadingField = {
  key: string;
  label: string;
  multiline?: boolean;
};

export function SectionHeadingsCard({
  step = "1",
  title,
  description,
  fields,
  values,
  onChange,
  onSave,
  pending,
  saveLabel = "Save headings",
  message,
  error,
}: {
  step?: string;
  title: string;
  description?: string;
  fields: HeadingField[];
  values: Record<string, string | undefined>;
  onChange: (key: string, value: string) => void;
  onSave: () => void;
  pending?: boolean;
  saveLabel?: string;
  message?: string | null;
  error?: string | null;
}) {
  return (
    <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 space-y-4">
      <div>
        <h3 className="font-display text-lg font-bold text-[var(--admin-text)]">
          {step}. {title}
        </h3>
        {description ? (
          <p className="mt-1 text-xs text-[var(--admin-muted)]">{description}</p>
        ) : null}
      </div>
      {fields.map((field) => (
        <div key={field.key}>
          <AdminFieldLabel>{field.label}</AdminFieldLabel>
          {field.multiline ? (
            <textarea
              className={cn(adminFieldClass, "min-h-24")}
              value={values[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
            />
          ) : (
            <input
              className={adminFieldClass}
              value={values[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
            />
          )}
        </div>
      ))}
      {message ? <p className="text-sm text-emerald">{message}</p> : null}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <button
        type="button"
        disabled={pending}
        onClick={onSave}
        className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
      >
        <Save className="h-4 w-4" />
        {pending ? "Saving…" : saveLabel}
      </button>
    </div>
  );
}

export function BlockGuide({
  items,
}: {
  items: { title: string; detail: string }[];
}) {
  return (
    <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4 text-sm text-[var(--admin-text)]">
      <p className="font-bold">What you are editing</p>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-[var(--admin-muted)]">
        {items.map((item) => (
          <li key={item.title}>
            <strong className="text-[var(--admin-text)]">{item.title}</strong> —{" "}
            {item.detail}
          </li>
        ))}
      </ol>
    </div>
  );
}
