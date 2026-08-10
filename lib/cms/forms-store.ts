import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type FormKind = "contact" | "membership" | "proposal";

export type ContactFormRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

export type MembershipFormRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  country: string | null;
  contribution_type: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

export type ProposalFormRow = {
  id: string;
  ref_id: string;
  title: string;
  state: string;
  sector: string;
  budget: string;
  summary: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  dpr_note: string | null;
  status: string;
  created_at: string;
};

type FormsFile = {
  contact: ContactFormRow[];
  membership: MembershipFormRow[];
  proposal: ProposalFormRow[];
};

const STORE_PATH = path.join(process.cwd(), "data", "cms", "forms.json");

async function readForms(): Promise<FormsFile> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<FormsFile>;
    return {
      contact: Array.isArray(parsed.contact) ? parsed.contact : [],
      membership: Array.isArray(parsed.membership) ? parsed.membership : [],
      proposal: Array.isArray(parsed.proposal) ? parsed.proposal : [],
    };
  } catch {
    return { contact: [], membership: [], proposal: [] };
  }
}

async function writeForms(data: FormsFile) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
}

export async function appendContactForm(
  input: Omit<ContactFormRow, "id" | "status" | "created_at">
) {
  const store = await readForms();
  const row: ContactFormRow = {
    id: randomUUID(),
    ...input,
    status: "new",
    created_at: new Date().toISOString(),
  };
  store.contact.unshift(row);
  await writeForms(store);
  return row;
}

export async function appendMembershipForm(
  input: Omit<MembershipFormRow, "id" | "status" | "created_at">
) {
  const store = await readForms();
  const row: MembershipFormRow = {
    id: randomUUID(),
    ...input,
    status: "new",
    created_at: new Date().toISOString(),
  };
  store.membership.unshift(row);
  await writeForms(store);
  return row;
}

export function makeProposalRefId() {
  const year = new Date().getFullYear();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `PROP-${year}-${suffix}`;
}

export async function appendProposalForm(
  input: Omit<ProposalFormRow, "id" | "status" | "created_at" | "ref_id"> & {
    ref_id?: string;
  }
) {
  const store = await readForms();
  const row: ProposalFormRow = {
    id: randomUUID(),
    ref_id: input.ref_id || makeProposalRefId(),
    title: input.title,
    state: input.state,
    sector: input.sector,
    budget: input.budget,
    summary: input.summary,
    contact_name: input.contact_name,
    contact_email: input.contact_email,
    contact_phone: input.contact_phone,
    dpr_note: input.dpr_note,
    status: "new",
    created_at: new Date().toISOString(),
  };
  store.proposal.unshift(row);
  await writeForms(store);
  return row;
}

export async function listForms(kind: "contact"): Promise<ContactFormRow[]>;
export async function listForms(kind: "membership"): Promise<MembershipFormRow[]>;
export async function listForms(kind: "proposal"): Promise<ProposalFormRow[]>;
export async function listForms(kind: FormKind) {
  const store = await readForms();
  return store[kind];
}

export async function updateFormStatus(
  kind: FormKind,
  id: string,
  status: string
) {
  const store = await readForms();
  const rows = store[kind];
  const idx = rows.findIndex((r) => r.id === id);
  if (idx < 0) return null;
  rows[idx] = { ...rows[idx], status };
  await writeForms(store);
  return rows[idx];
}
