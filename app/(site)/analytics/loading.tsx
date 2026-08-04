import { PageSkeleton } from "@/components/loading/skeletons";

export default function AnalyticsLoading() {
  return (
    <div className="space-y-8 pb-16">
      <PageSkeleton variant="default" />
    </div>
  );
}
