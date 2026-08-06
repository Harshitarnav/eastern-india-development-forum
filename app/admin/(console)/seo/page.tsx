"use client";

import { CmsSeoManager } from "@/components/cms/CmsSeoManager";
import { CmsRedirectsEditor } from "@/components/cms/CmsRedirectsEditor";

export default function Page() {
  return (
    <div className="space-y-10">
      <CmsSeoManager />
      <div className="mx-auto max-w-6xl">
        <CmsRedirectsEditor />
      </div>
    </div>
  );
}
