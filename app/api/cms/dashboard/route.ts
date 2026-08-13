import { NextResponse } from "next/server";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import { getCmsSnapshot } from "@/lib/cms/repository";
import {
  listForms,
  type ContactFormRow,
  type MembershipFormRow,
  type ProposalFormRow,
} from "@/lib/cms/forms-store";
import {
  isSupabaseConfigured,
  supabaseSelect,
} from "@/lib/cms/supabase-store";

type ActivityItem = {
  id: string;
  title: string;
  time: string;
  at: string;
  tag: string;
  href: string;
};

type FormPreview = {
  id: string;
  kind: "contact" | "membership" | "proposal";
  name: string;
  email: string;
  detail: string;
  status: string;
  created_at: string;
};

function countCollection(
  items: { collection: string; is_published?: boolean }[],
  collection: string,
  publishedOnly = true
) {
  return items.filter(
    (i) =>
      i.collection === collection &&
      (!publishedOnly || i.is_published !== false)
  ).length;
}

function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

async function loadContactRows(): Promise<ContactFormRow[]> {
  if (isSupabaseConfigured()) {
    try {
      const rows = await supabaseSelect(
        "contact_messages",
        "select=*&order=created_at.desc"
      );
      return rows as ContactFormRow[];
    } catch {
      // fall through
    }
  }
  return listForms("contact");
}

async function loadMembershipRows(): Promise<MembershipFormRow[]> {
  if (isSupabaseConfigured()) {
    try {
      const rows = await supabaseSelect(
        "membership_applications",
        "select=*&order=created_at.desc"
      );
      return rows as MembershipFormRow[];
    } catch {
      // fall through
    }
  }
  return listForms("membership");
}

async function loadProposalRows(): Promise<ProposalFormRow[]> {
  if (isSupabaseConfigured()) {
    try {
      const rows = await supabaseSelect(
        "project_proposals",
        "select=*&order=created_at.desc"
      );
      return rows as ProposalFormRow[];
    } catch {
      // fall through
    }
  }
  return listForms("proposal");
}

export async function GET() {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;

  const [snap, contact, membership, proposals] = await Promise.all([
    getCmsSnapshot(),
    loadContactRows(),
    loadMembershipRows(),
    loadProposalRows(),
  ]);

  const items = snap.items || [];
  const projects = countCollection(items, "projects");
  const schemes = countCollection(items, "schemes");
  const tenders = countCollection(items, "tenders");
  const events = countCollection(items, "events");
  const partners = countCollection(items, "partners");
  const reports = countCollection(items, "reports");
  const gallery = countCollection(items, "gallery");
  const zones = countCollection(items, "investmentZones");
  const states = countCollection(items, "states");
  const offices = countCollection(items, "offices");
  const news = countCollection(items, "news");
  const leaders = countCollection(items, "leaders");

  const openTenders = items.filter((i) => {
    if (i.collection !== "tenders" || i.is_published === false) return false;
    const status = String((i.data as { status?: string })?.status || "");
    return /open|closing/i.test(status) || !status;
  }).length;

  const pendingContact = contact.filter((r) => r.status === "new").length;
  const pendingMembership = membership.filter((r) => r.status === "new").length;
  const pendingProposals = proposals.filter((r) => r.status === "new").length;
  const pendingRequests = pendingContact + pendingMembership + pendingProposals;

  const formPreviews: FormPreview[] = [
    ...contact.map((r) => ({
      id: r.id,
      kind: "contact" as const,
      name: r.full_name,
      email: r.email,
      detail: r.subject,
      status: r.status,
      created_at: r.created_at,
    })),
    ...membership.map((r) => ({
      id: r.id,
      kind: "membership" as const,
      name: r.full_name,
      email: r.email,
      detail: r.contribution_type || "Membership application",
      status: r.status,
      created_at: r.created_at,
    })),
    ...proposals.map((r) => ({
      id: r.id,
      kind: "proposal" as const,
      name: r.contact_name,
      email: r.contact_email,
      detail: r.ref_id ? `${r.ref_id} · ${r.title}` : r.title,
      status: r.status,
      created_at: r.created_at,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 8);

  const activity: ActivityItem[] = formPreviews.slice(0, 6).map((f) => ({
    id: f.id,
    title:
      f.kind === "membership"
        ? `Membership application from ${f.name}`
        : f.kind === "proposal"
          ? `Proposal submitted by ${f.name}`
          : `Contact message from ${f.name}`,
    time: relativeTime(f.created_at),
    at: f.created_at,
    tag:
      f.kind === "membership"
        ? "Membership"
        : f.kind === "proposal"
          ? "Proposals"
          : "Contact",
    href: "/admin/forms",
  }));

  if (snap.updatedAt) {
    activity.push({
      id: "cms-updated",
      title: "CMS content last saved",
      time: relativeTime(snap.updatedAt),
      at: snap.updatedAt,
      tag: "CMS",
      href: "/admin/cms",
    });
  }

  activity.sort(
    (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
  );

  const upcomingEvents = items
    .filter((i) => i.collection === "events" && i.is_published !== false)
    .map((i) => {
      const d = i.data as {
        title?: string;
        date?: string;
        location?: string;
        type?: string;
        mode?: string;
      };
      return {
        id: i.id,
        title: d.title || "Untitled event",
        date: d.date || "TBA",
        location: d.location || "",
        type: d.type || "",
        mode: d.mode || "",
      };
    })
    .slice(0, 5);

  return NextResponse.json({
    stats: {
      projects,
      schemes,
      tenders,
      openTenders,
      events,
      partners,
      reports,
      gallery,
      zones,
      states,
      offices,
      news,
      leaders,
      membershipApplications: membership.length,
      contactMessages: contact.length,
      proposals: proposals.length,
      pendingRequests,
      pendingContact,
      pendingMembership,
      pendingProposals,
    },
    activity: activity.slice(0, 8),
    recentForms: formPreviews,
    upcomingEvents,
    meta: {
      cmsUpdatedAt: snap.updatedAt,
      siteName: snap.settings?.name || "EIDF",
      source: isSupabaseConfigured() ? "database" : "local-file",
    },
  });
}
