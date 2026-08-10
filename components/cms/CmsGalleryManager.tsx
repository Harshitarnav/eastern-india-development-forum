"use client";

import React, { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ImagePlus,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
  Loader2,
  Search,
  FolderPlus,
} from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { AdminFieldLabel, adminFieldClass } from "@/components/ui";
import { cn } from "@/lib/utils";

const DEFAULT_CATEGORIES = [
  "Seminars",
  "Site Visits",
  "Community",
  "Identity & Media",
] as const;

type GalleryData = {
  id?: string;
  src: string;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
};

type ItemRecord = {
  id: string;
  collection: string;
  data: GalleryData;
  sort_order: number;
  is_published: boolean;
  slug?: string | null;
};

type DraftRow = {
  key: string;
  file?: File;
  preview: string;
  src: string;
  title: string;
  description: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function fetchGallery(): Promise<ItemRecord[]> {
  const res = await fetch("/api/cms/items?collection=gallery");
  if (!res.ok) throw new Error("Failed to load gallery");
  const json = await res.json();
  return json.items || [];
}

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.set("file", file);
  fd.set("alt", file.name.replace(/\.[^.]+$/, "") || "gallery");
  fd.set("folder", "gallery");
  const res = await fetch("/api/cms/media", { method: "POST", body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Upload failed");
  const url = json.media?.url as string | undefined;
  if (!url) throw new Error("Upload succeeded but no URL returned");
  return url;
}

async function saveItem(item: ItemRecord) {
  const res = await fetch(
    `/api/cms/items/gallery/${encodeURIComponent(item.id)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    }
  );
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Save failed");
  return json;
}

async function deleteItem(id: string) {
  const res = await fetch(`/api/cms/items/gallery/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete failed");
}

export function CmsGalleryManager() {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [panel, setPanel] = useState<"closed" | "create" | "edit">("closed");
  const [editing, setEditing] = useState<ItemRecord | null>(null);

  // Shared create/edit content
  const [categoryMode, setCategoryMode] = useState<"select" | "create">("select");
  const [category, setCategory] = useState<string>(DEFAULT_CATEGORIES[0]);
  const [newCategory, setNewCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [published, setPublished] = useState(true);

  // Multi create drafts (image + per-image content)
  const [drafts, setDrafts] = useState<DraftRow[]>([]);

  // Single edit form
  const [editForm, setEditForm] = useState<GalleryData>({
    src: "",
    title: "",
    category: DEFAULT_CATEGORIES[0],
    description: "",
    location: "",
    date: "",
  });

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["cms-items", "gallery"],
    queryFn: fetchGallery,
  });

  const categories = useMemo(() => {
    const set = new Set<string>(DEFAULT_CATEGORIES);
    for (const item of items) {
      const c = String(item.data?.category || "").trim();
      if (c) set.add(c);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) =>
      JSON.stringify(item.data).toLowerCase().includes(needle)
    );
  }, [items, q]);

  const resolvedCategory = () => {
    if (categoryMode === "create") {
      const created = newCategory.trim();
      if (!created) throw new Error("New category name is required");
      return created;
    }
    if (!category.trim()) throw new Error("Select a category");
    return category.trim();
  };

  const resetCreate = () => {
    setDrafts((prev) => {
      prev.forEach((d) => {
        if (d.preview.startsWith("blob:")) URL.revokeObjectURL(d.preview);
      });
      return [];
    });
    setCategoryMode("select");
    setCategory(DEFAULT_CATEGORIES[0]);
    setNewCategory("");
    setLocation("");
    setDate("");
    setPublished(true);
    setError(null);
  };

  const openCreate = () => {
    resetCreate();
    setEditing(null);
    setPanel("create");
  };

  const openEdit = (item: ItemRecord) => {
    setEditing(item);
    setEditForm({
      src: String(item.data.src || ""),
      title: String(item.data.title || ""),
      category: String(item.data.category || DEFAULT_CATEGORIES[0]),
      description: String(item.data.description || ""),
      location: String(item.data.location || ""),
      date: String(item.data.date || ""),
    });
    const existingCat = String(item.data.category || "");
    if (existingCat && !categories.includes(existingCat)) {
      setCategoryMode("create");
      setNewCategory(existingCat);
    } else {
      setCategoryMode("select");
      setCategory(existingCat || DEFAULT_CATEGORIES[0]);
    }
    setPublished(item.is_published !== false);
    setError(null);
    setPanel("edit");
  };

  const closePanel = () => {
    setPanel("closed");
    setEditing(null);
    resetCreate();
  };

  const addFiles = (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!list.length) {
      setError("Please choose image files only");
      return;
    }
    setError(null);
    setDrafts((prev) => [
      ...prev,
      ...list.map((file) => ({
        key: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        src: "",
        title: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
        description: "",
      })),
    ]);
  };

  const addPathDraft = (pathValue: string) => {
    const src = pathValue.trim();
    if (!src) return;
    setDrafts((prev) => [
      ...prev,
      {
        key: `path-${src}-${Date.now()}`,
        preview: src,
        src,
        title: src.split("/").pop()?.replace(/\.[^.]+$/, "") || "Gallery image",
        description: "",
      },
    ]);
  };

  const saveCreate = useMutation({
    mutationFn: async () => {
      if (!drafts.length) throw new Error("Add at least one image");
      const cat = resolvedCategory();
      const baseSort = items.length;

      for (let i = 0; i < drafts.length; i++) {
        const draft = drafts[i];
        let src = draft.src;
        if (draft.file) src = await uploadFile(draft.file);
        if (!src) throw new Error(`Image missing for "${draft.title || "item"}"`);
        if (!draft.title.trim()) throw new Error("Each image needs a title");

        const id = `img-${slugify(draft.title)}-${Date.now().toString(36)}-${i}`;
        await saveItem({
          id,
          collection: "gallery",
          data: {
            id,
            src,
            title: draft.title.trim(),
            category: cat,
            description: draft.description.trim(),
            location: location.trim(),
            date: date.trim(),
          },
          sort_order: baseSort + i,
          is_published: published,
          slug: slugify(draft.title),
        });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-items", "gallery"] });
      closePanel();
    },
    onError: (err: Error) => setError(err.message),
  });

  const saveEdit = useMutation({
    mutationFn: async () => {
      if (!editing) throw new Error("Nothing to edit");
      const cat =
        categoryMode === "create" ? newCategory.trim() : category.trim();
      if (!cat) throw new Error("Category is required");
      if (!editForm.src.trim()) throw new Error("Image is required");
      if (!editForm.title.trim()) throw new Error("Title is required");

      await saveItem({
        ...editing,
        is_published: published,
        slug: slugify(editForm.title),
        data: {
          ...editForm,
          id: editing.id,
          src: editForm.src.trim(),
          title: editForm.title.trim(),
          category: cat,
          description: editForm.description.trim(),
          location: editForm.location.trim(),
          date: editForm.date.trim(),
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms-items", "gallery"] });
      closePanel();
    },
    onError: (err: Error) => setError(err.message),
  });

  const removeMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-items", "gallery"] }),
    onError: (err: Error) => setError(err.message),
  });

  const replaceEditImage = async (file: File) => {
    try {
      setError(null);
      const url = await uploadFile(file);
      setEditForm((prev) => ({ ...prev, src: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--admin-text)] md:text-3xl">
            Gallery
          </h1>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">
            Add, edit, or remove gallery images and captions. Assign a shared
            category when uploading multiple images, or create a new one.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-bold text-navy shadow-sm hover:brightness-105"
        >
          <Plus className="h-4 w-4" /> Add images
        </button>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search gallery…"
          className={cn(adminFieldClass, "pl-10")}
        />
      </div>

      {error && panel === "closed" && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-8 text-sm text-[var(--admin-muted)]">
          Loading gallery…
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No gallery items yet"
          description="Add images with title, category, and details in one step."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-sm"
            >
              <div className="relative h-44 bg-[var(--admin-bg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={String(item.data.src || "")}
                  alt={String(item.data.title || "Gallery")}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-navy/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gold">
                  {String(item.data.category || "Uncategorized")}
                </span>
                {!item.is_published && (
                  <span className="absolute right-3 top-3 rounded-full bg-amber-500/90 px-2 py-1 text-[10px] font-bold text-white">
                    Draft
                  </span>
                )}
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <h3 className="font-display text-base font-bold text-[var(--admin-text)] line-clamp-1">
                    {String(item.data.title || "Untitled")}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--admin-muted)] line-clamp-2">
                    {String(item.data.description || "No description")}
                  </p>
                  <p className="mt-2 text-[11px] text-[var(--admin-muted)]">
                    {[item.data.location, item.data.date].filter(Boolean).join(" · ") ||
                      "—"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--admin-border)] px-3 py-2 text-xs font-bold text-[var(--admin-text)] hover:bg-[var(--admin-bg)]"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        confirm(
                          `Delete "${item.data.title || item.id}" from gallery?`
                        )
                      ) {
                        removeMutation.mutate(item.id);
                      }
                    }}
                    className="inline-flex items-center justify-center rounded-xl border border-red-500/30 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {panel !== "closed" && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="flex h-full w-full max-w-xl flex-col border-l border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-5 py-4">
              <h2 className="font-display text-lg font-bold text-[var(--admin-text)]">
                {panel === "create" ? "Add gallery images" : "Edit gallery item"}
              </h2>
              <button
                type="button"
                onClick={closePanel}
                className="rounded-lg p-2 hover:bg-[var(--admin-bg)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
              {/* Category select / create */}
              <div className="space-y-3 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-bg)]/40 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--admin-text)]">
                  <FolderPlus className="h-4 w-4 text-gold" />
                  Category
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCategoryMode("select")}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-bold",
                      categoryMode === "select"
                        ? "bg-gold/20 text-gold"
                        : "border border-[var(--admin-border)] text-[var(--admin-muted)]"
                    )}
                  >
                    Select existing
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategoryMode("create")}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-bold",
                      categoryMode === "create"
                        ? "bg-gold/20 text-gold"
                        : "border border-[var(--admin-border)] text-[var(--admin-muted)]"
                    )}
                  >
                    Create new
                  </button>
                </div>
                {categoryMode === "select" ? (
                  <select
                    className={adminFieldClass}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={adminFieldClass}
                    value={newCategory}
                    placeholder="e.g. Conventions"
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                )}
              </div>

              {panel === "create" ? (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <AdminFieldLabel>Location (shared)</AdminFieldLabel>
                      <input
                        className={adminFieldClass}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Ranchi, Jharkhand"
                      />
                    </div>
                    <div>
                      <AdminFieldLabel>Date (shared)</AdminFieldLabel>
                      <input
                        className={adminFieldClass}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="August 2026"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <AdminFieldLabel>Images + content</AdminFieldLabel>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-xs font-bold"
                        >
                          <Upload className="h-3.5 w-3.5 text-gold" /> Upload files
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const pathValue = prompt(
                              "Public image path / URL",
                              "/images/eidf_15.jpeg"
                            );
                            if (pathValue) addPathDraft(pathValue);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--admin-border)] px-3 py-1.5 text-xs font-bold"
                        >
                          <ImagePlus className="h-3.5 w-3.5" /> Add path
                        </button>
                      </div>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.length) addFiles(e.target.files);
                        e.target.value = "";
                      }}
                    />

                    {drafts.length === 0 ? (
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-bg)]/30 px-4 py-10 text-sm text-[var(--admin-muted)] hover:border-gold/40"
                      >
                        <Upload className="h-6 w-6 text-gold" />
                        Drop / choose multiple images, then fill title & details
                      </button>
                    ) : (
                      <div className="space-y-4">
                        {drafts.map((draft) => (
                          <div
                            key={draft.key}
                            className="grid gap-3 rounded-2xl border border-[var(--admin-border)] p-3 sm:grid-cols-[120px_1fr]"
                          >
                            <div className="relative h-28 overflow-hidden rounded-xl bg-[var(--admin-bg)]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={draft.preview || draft.src}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setDrafts((prev) =>
                                    prev.filter((d) => {
                                      if (d.key === draft.key && d.preview.startsWith("blob:")) {
                                        URL.revokeObjectURL(d.preview);
                                      }
                                      return d.key !== draft.key;
                                    })
                                  )
                                }
                                className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="space-y-2">
                              <input
                                className={adminFieldClass}
                                value={draft.title}
                                placeholder="Title"
                                onChange={(e) =>
                                  setDrafts((prev) =>
                                    prev.map((d) =>
                                      d.key === draft.key
                                        ? { ...d, title: e.target.value }
                                        : d
                                    )
                                  )
                                }
                              />
                              <textarea
                                className={cn(adminFieldClass, "min-h-20")}
                                value={draft.description}
                                placeholder="Description / content"
                                onChange={(e) =>
                                  setDrafts((prev) =>
                                    prev.map((d) =>
                                      d.key === draft.key
                                        ? { ...d, description: e.target.value }
                                        : d
                                    )
                                  )
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <AdminFieldLabel>Image</AdminFieldLabel>
                    <div className="overflow-hidden rounded-2xl border border-[var(--admin-border)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={editForm.src}
                        alt={editForm.title}
                        className="h-48 w-full object-cover bg-[var(--admin-bg)]"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--admin-border)] px-3 py-2 text-xs font-bold">
                        <Upload className="h-3.5 w-3.5 text-gold" />
                        Replace image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) void replaceEditImage(file);
                          }}
                        />
                      </label>
                    </div>
                    <input
                      className={adminFieldClass}
                      value={editForm.src}
                      placeholder="/images/..."
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, src: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <AdminFieldLabel>Title</AdminFieldLabel>
                    <input
                      className={adminFieldClass}
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <AdminFieldLabel>Description / content</AdminFieldLabel>
                    <textarea
                      className={cn(adminFieldClass, "min-h-28")}
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <AdminFieldLabel>Location</AdminFieldLabel>
                      <input
                        className={adminFieldClass}
                        value={editForm.location}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <AdminFieldLabel>Date</AdminFieldLabel>
                      <input
                        className={adminFieldClass}
                        value={editForm.date}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, date: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </>
              )}

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
                disabled={saveCreate.isPending || saveEdit.isPending}
                onClick={() =>
                  panel === "create" ? saveCreate.mutate() : saveEdit.mutate()
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white hover:brightness-110 disabled:opacity-60"
              >
                {(saveCreate.isPending || saveEdit.isPending) && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {saveCreate.isPending || saveEdit.isPending
                  ? "Saving…"
                  : panel === "create"
                    ? `Save ${drafts.length || 0} image${drafts.length === 1 ? "" : "s"}`
                    : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
