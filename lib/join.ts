export const JOIN_STATES = [
  { value: "Bihar", hi: "बिहार" },
  { value: "Jharkhand", hi: "झारखंड" },
  { value: "Odisha", hi: "ओडिशा" },
  { value: "West Bengal", hi: "पश्चिम बंगाल" },
  { value: "Assam", hi: "असम" },
  { value: "Arunachal Pradesh", hi: "अरुणाचल प्रदेश" },
  { value: "Manipur", hi: "मणिपुर" },
  { value: "Meghalaya", hi: "मेघालय" },
  { value: "Mizoram", hi: "मिजोरम" },
  { value: "Nagaland", hi: "नागालैंड" },
  { value: "Sikkim", hi: "सिक्किम" },
  { value: "Tripura", hi: "त्रिपुरा" },
  { value: "Other", hi: "अन्य" },
] as const;

export const JOIN_INTENTS = [
  { value: "member", en: "Become a member", hi: "सदस्य बनना" },
  { value: "volunteer", en: "Give my time", hi: "अपना समय देना" },
  { value: "local_need", en: "Share a need from my area", hi: "अपने इलाके की ज़रूरत बताना" },
  { value: "partner", en: "Partner or support the work", hi: "साथ मिलकर काम करना" },
] as const;

export type JoinIntent = (typeof JOIN_INTENTS)[number]["value"];

const INTENT_SET = new Set<string>(JOIN_INTENTS.map((item) => item.value));
const STATE_SET = new Set<string>(JOIN_STATES.map((item) => item.value));

export function isLandingSignup(contribution: unknown) {
  return typeof contribution === "string" && INTENT_SET.has(contribution);
}

export function intentLabel(value: unknown) {
  const match = JOIN_INTENTS.find((item) => item.value === value);
  return match ? match.en : "";
}

/** Indian mobile, stored as +91XXXXXXXXXX. */
export function normalizeIndianMobile(raw: string) {
  const digits = raw.replace(/\D/g, "");
  let local = digits;
  if (local.length === 12 && local.startsWith("91")) local = local.slice(2);
  if (local.length === 11 && local.startsWith("0")) local = local.slice(1);
  if (!/^[6-9]\d{9}$/.test(local)) return null;
  return `+91${local}`;
}

const PERSON_NAME = /^[\p{L}\p{M}\s.'-]{2,80}$/u;

export type JoinInput = {
  full_name: string;
  phone: string;
  state: string;
  place: string;
  intent: JoinIntent;
  email: string;
};

export function parseJoinBody(body: Record<string, unknown>):
  | { ok: true; data: JoinInput }
  | { ok: false; error: string } {
  const full_name = String(body.full_name || "").trim().replace(/\s+/g, " ");
  const phone = normalizeIndianMobile(String(body.phone || ""));
  const state = String(body.state || "").trim();
  const place = String(body.place || "").trim().replace(/\s+/g, " ");
  const intent = String(body.intent || "").trim();
  const email = String(body.email || "").trim();

  if (!PERSON_NAME.test(full_name)) {
    return { ok: false, error: "Enter your full name. पूरा नाम लिखें।" };
  }
  if (!phone) {
    return {
      ok: false,
      error: "Enter a 10-digit mobile number. 10 अंकों का मोबाइल नंबर लिखें।",
    };
  }
  if (!STATE_SET.has(state)) {
    return { ok: false, error: "Choose your state. अपना राज्य चुनें।" };
  }
  if (place.length < 2 || place.length > 80) {
    return {
      ok: false,
      error: "Enter your district or village. जिला या गाँव लिखें।",
    };
  }
  if (!INTENT_SET.has(intent)) {
    return { ok: false, error: "Choose how you want to join. जुड़ने का तरीका चुनें।" };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "That email does not look right. ईमेल सही नहीं है।" };
  }

  return {
    ok: true,
    data: {
      full_name,
      phone,
      state,
      place,
      intent: intent as JoinIntent,
      email,
    },
  };
}
