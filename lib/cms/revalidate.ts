import { revalidatePath, revalidateTag } from "next/cache";

export const CMS_TAGS = {
  all: "cms:all",
  settings: "cms:settings",
  nav: "cms:nav",
  seo: "cms:seo",
  home: "cms:home",
  projects: "cms:projects",
  schemes: "cms:schemes",
  tenders: "cms:tenders",
  investors: "cms:investors",
  events: "cms:events",
  news: "cms:news",
  gallery: "cms:gallery",
  resources: "cms:resources",
  about: "cms:about",
  membership: "cms:membership",
  contact: "cms:contact",
  analytics: "cms:analytics",
} as const;

export function revalidateCms(scope: keyof typeof CMS_TAGS | "everything" = "everything") {
  try {
    revalidateTag(CMS_TAGS.all, "max");
  } catch {
    // Next version differences
    try {
      // @ts-expect-error legacy signature
      revalidateTag(CMS_TAGS.all);
    } catch {
      /* ignore */
    }
  }

  if (scope !== "everything") {
    try {
      revalidateTag(CMS_TAGS[scope], "max");
    } catch {
      try {
        // @ts-expect-error legacy
        revalidateTag(CMS_TAGS[scope]);
      } catch {
        /* ignore */
      }
    }
  }

  try {
    revalidatePath("/", "layout");
  } catch {
    /* ignore */
  }

  const paths = [
    "/",
    "/about",
    "/projects",
    "/schemes",
    "/tenders",
    "/investors",
    "/resources",
    "/membership",
    "/events",
    "/gallery",
    "/contact",
    "/analytics",
    "/creatives",
    "/proposals/submit",
    "/privacy",
    "/terms",
  ];
  for (const p of paths) {
    try {
      revalidatePath(p);
    } catch {
      /* ignore */
    }
  }
}
