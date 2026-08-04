import { FormSkeleton, HeroSkeleton } from "@/components/loading/skeletons";

export default function ProposalLoading() {
  return (
    <div className="space-y-8 pb-16">
      <HeroSkeleton />
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <FormSkeleton />
          <FormSkeleton />
        </div>
      </div>
    </div>
  );
}
