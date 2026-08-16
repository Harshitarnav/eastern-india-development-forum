"use client";

import { Skeleton, SkeletonText } from "@/components/loading/Skeleton";

export function HeroSkeleton() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-slate-dark px-4 py-20 md:py-28"
      aria-busy="true"
      aria-label="Loading page hero"
    >
      <div className="mx-auto max-w-4xl space-y-5 text-center">
        <Skeleton className="mx-auto h-7 w-40" rounded="full" />
        <Skeleton className="mx-auto h-12 w-full max-w-xl md:h-14" rounded="2xl" />
        <Skeleton className="mx-auto h-4 w-full max-w-md" rounded="md" />
        <Skeleton className="mx-auto h-4 w-3/4 max-w-sm" rounded="md" />
        <div className="flex justify-center gap-3 pt-4">
          <Skeleton className="h-12 w-36" rounded="full" />
          <Skeleton className="h-12 w-36" rounded="full" />
        </div>
      </div>
    </section>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading cards"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-3xl border border-line bg-white p-0 shadow-md dark:border-[var(--admin-border)] dark:bg-[var(--admin-surface)]"
        >
          <Skeleton className="h-44 w-full" rounded="none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-5 w-2/3" />
            <SkeletonText lines={3} />
            <Skeleton className="mt-2 h-10 w-full" rounded="2xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-line bg-white p-5 shadow-md dark:border-[var(--admin-border)] dark:bg-[var(--admin-surface)]"
        >
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-11 w-11" rounded="2xl" />
            <Skeleton className="h-6 w-14" rounded="full" />
          </div>
          <Skeleton className="mb-2 h-8 w-20" />
          <Skeleton className="h-3 w-24" rounded="md" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div
      className="overflow-hidden rounded-3xl border border-line bg-white dark:border-[var(--admin-border)] dark:bg-[var(--admin-surface)]"
      aria-busy="true"
      aria-label="Loading table"
    >
      <div className="border-b border-line px-4 py-3 dark:border-[var(--admin-border)]">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-28" rounded="md" />
          <Skeleton className="h-4 w-40" rounded="md" />
          <Skeleton className="h-4 w-24" rounded="md" />
          <Skeleton className="ml-auto h-4 w-20" rounded="md" />
        </div>
      </div>
      <div className="divide-y divide-line dark:divide-[var(--admin-border)]">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-4">
            <Skeleton className="h-4 w-24" rounded="md" />
            <Skeleton className="h-4 w-48" rounded="md" />
            <Skeleton className="h-4 w-20" rounded="md" />
            <Skeleton className="ml-auto h-8 w-24" rounded="xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div
      className="space-y-4 rounded-3xl border border-line bg-white p-6 shadow-xl dark:border-[var(--admin-border)] dark:bg-[var(--admin-surface)] sm:p-8"
      aria-busy="true"
      aria-label="Loading form"
    >
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-3 w-64" rounded="md" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" rounded="md" />
          <Skeleton className="h-12 w-full" rounded="2xl" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" rounded="md" />
          <Skeleton className="h-12 w-full" rounded="2xl" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-24" rounded="md" />
        <Skeleton className="h-28 w-full" rounded="2xl" />
      </div>
      <Skeleton className="h-12 w-full" rounded="full" />
    </div>
  );
}

export function GallerySkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-3xl border border-line bg-white dark:border-[var(--admin-border)] dark:bg-[var(--admin-surface)]"
        >
          <Skeleton className="h-56 w-full" rounded="none" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-4 w-3/4" rounded="md" />
            <Skeleton className="h-3 w-1/2" rounded="md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div
      className="rounded-3xl border border-line bg-white p-6 shadow-md dark:border-[var(--admin-border)] dark:bg-[var(--admin-surface)]"
      aria-busy="true"
      aria-label="Loading chart"
    >
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-24" rounded="full" />
      </div>
      <div className="flex h-56 items-end gap-3 px-2">
        {[40, 65, 45, 80, 55, 70, 50, 90].map((h, i) => (
          <div
            key={i}
            className="w-full"
            style={{ height: `${h}%` }}
          >
            <Skeleton className="h-full w-full" rounded="lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-busy="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 dark:border-[var(--admin-border)] dark:bg-[var(--admin-surface)]"
        >
          <Skeleton className="h-12 w-12 shrink-0" rounded="2xl" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" rounded="md" />
            <Skeleton className="h-3 w-1/2" rounded="md" />
          </div>
          <Skeleton className="h-8 w-20" rounded="full" />
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton({
  variant = "default",
}: {
  variant?: "default" | "gallery" | "form" | "dashboard" | "table";
}) {
  if (variant === "gallery") {
    return (
      <div className="space-y-8 pb-16">
        <HeroSkeleton />
        <div className="mx-auto max-w-7xl px-4">
          <Skeleton className="mb-6 h-14 w-full" rounded="3xl" />
          <GallerySkeleton />
        </div>
      </div>
    );
  }

  if (variant === "form") {
    return (
      <div className="space-y-8 pb-16">
        <HeroSkeleton />
        <div className="mx-auto max-w-2xl px-4">
          <FormSkeleton />
        </div>
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className="space-y-8 pb-16">
        <HeroSkeleton />
        <div className="mx-auto max-w-7xl space-y-6 px-4">
          <Skeleton className="h-14 w-full" rounded="3xl" />
          <TableSkeleton />
        </div>
      </div>
    );
  }

  if (variant === "dashboard") {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-10 pb-16">
      <HeroSkeleton />
      <div className="mx-auto max-w-7xl space-y-10 px-4">
        <StatSkeleton />
        <CardSkeleton />
        <ListSkeleton />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8" aria-busy="true" aria-label="Loading dashboard">
      <Skeleton className="h-40 w-full" rounded="3xl" />
      <StatSkeleton count={8} />
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-3 rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 lg:col-span-7">
          <Skeleton className="h-6 w-40" />
          <ListSkeleton rows={4} />
        </div>
        <div className="space-y-4 lg:col-span-5">
          <div className="space-y-3 rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-12 w-full" rounded="2xl" />
            <Skeleton className="h-12 w-full" rounded="2xl" />
            <Skeleton className="h-12 w-full" rounded="2xl" />
          </div>
          <ChartSkeleton />
        </div>
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="hidden h-screen w-[260px] flex-col border-r border-[var(--admin-border)] bg-[var(--admin-sidebar)] p-3 lg:flex">
      <div className="mb-4 flex items-center gap-2 px-2 py-3">
        <Skeleton className="h-9 w-9" rounded="xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-24" rounded="md" />
          <Skeleton className="h-2 w-16" rounded="md" />
        </div>
      </div>
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="mb-1 h-10 w-full" rounded="xl" />
      ))}
    </div>
  );
}

export function NavbarSkeleton() {
  return (
    <div className="flex h-[61px] items-center gap-3 border-b border-[var(--admin-border)] bg-[var(--admin-surface)] px-4 md:px-6">
      <Skeleton className="h-4 w-48" rounded="md" />
      <div className="ml-auto flex items-center gap-2">
        <Skeleton className="hidden h-9 w-52 md:block" rounded="full" />
        <Skeleton className="h-9 w-28" rounded="full" />
        <Skeleton className="h-9 w-9" rounded="xl" />
        <Skeleton className="h-9 w-28" rounded="full" />
      </div>
    </div>
  );
}

export function AdminShellSkeleton() {
  return (
    <div className="admin-shell flex min-h-screen bg-[var(--admin-bg)]">
      <SidebarSkeleton />
      <div className="flex min-w-0 flex-1 flex-col">
        <NavbarSkeleton />
        <div className="p-4 md:p-6 lg:p-8">
          <DashboardSkeleton />
        </div>
      </div>
    </div>
  );
}
