import { intentLabel, type JoinInput } from "@/lib/join";

export type AlertStatus = "sent" | "skipped" | "failed";

const DEFAULT_RECIPIENTS = ["sanjeeveecd@gmail.com", "harshitarnav@gmail.com"];

function recipients() {
  const raw = process.env.NOTIFY_EMAIL?.trim();
  if (!raw) return DEFAULT_RECIPIENTS;
  const list = raw
    .split(/[,;\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return list.length ? list : DEFAULT_RECIPIENTS;
}

function alertText(input: JoinInput) {
  return [
    "New EIDF signup",
    `Name: ${input.full_name}`,
    `Phone: ${input.phone}`,
    `State: ${input.state}`,
    `Place: ${input.place}`,
    `Wants to: ${intentLabel(input.intent)}`,
    `Email: ${input.email || "—"}`,
  ].join("\n");
}

async function sendOne(key: string, from: string, to: string, input: JoinInput) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `EIDF signup · ${input.full_name} · ${input.state}`,
      text: alertText(input),
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    console.error("signup email failed", to, res.status, await res.text());
    return false;
  }
  return true;
}

async function sendEmail(input: JoinInput): Promise<AlertStatus> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return "skipped";

  const from = process.env.RESEND_FROM || "EIDF <onboarding@resend.dev>";
  const targets = recipients();

  try {
    const results = await Promise.all(
      targets.map((to) => sendOne(key, from, to, input))
    );
    return results.some(Boolean) ? "sent" : "failed";
  } catch (err) {
    console.error("signup email failed", err);
    return "failed";
  }
}

export async function notifySignup(input: JoinInput) {
  const email = await sendEmail(input);
  return { email };
}
