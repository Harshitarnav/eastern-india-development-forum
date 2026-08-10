import { EmptyState } from "@/components/dashboard/EmptyState";

export function AdminModulePage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--admin-text)] md:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          {description ??
            `Manage ${title.toLowerCase()} content for the Eastern India Development Forum platform.`}
        </p>
      </div>
      <EmptyState />
    </div>
  );
}
