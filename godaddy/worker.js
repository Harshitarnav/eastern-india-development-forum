const STATES = [
  "Bihar",
  "Jharkhand",
  "Odisha",
  "West Bengal",
  "Assam",
  "Arunachal Pradesh",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Sikkim",
  "Tripura",
  "Other",
];

const INTENTS = {
  member: "Become a member",
  volunteer: "Give my time",
  local_need: "Share a need from my area",
  partner: "Partner or support the work",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "POST" && (url.pathname === "/send.php" || url.pathname === "/send")) {
      return handleSignup(request, env);
    }
    if (url.pathname === "/config.php" || url.pathname === "/signups.log") {
      return new Response("Not found", { status: 404 });
    }
    return env.ASSETS.fetch(request);
  },
};

async function handleSignup(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Invalid request.");
  }
  if (!body || typeof body !== "object") return fail(400, "Invalid request.");
  if (String(body.website || "").trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = String(body.full_name || "").trim().replace(/\s+/g, " ");
  const state = String(body.state || "").trim();
  const place = String(body.place || "").trim().replace(/\s+/g, " ");
  const intent = String(body.intent || "").trim();
  const email = String(body.email || "").trim();
  const phone = normalizeMobile(String(body.phone || ""));

  if (!/^[\p{L}\p{M}\s.'-]{2,80}$/u.test(name)) {
    return fail(400, "Enter your full name. पूरा नाम लिखें।");
  }
  if (!phone) return fail(400, "Enter a 10-digit mobile number. 10 अंकों का मोबाइल नंबर लिखें।");
  if (!STATES.includes(state)) return fail(400, "Choose your state. अपना राज्य चुनें।");
  if (place.length < 2 || place.length > 80) {
    return fail(400, "Enter your district or village. जिला या गाँव लिखें।");
  }
  if (!INTENTS[intent]) return fail(400, "Choose how you want to join. जुड़ने का तरीका चुनें।");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail(400, "That email does not look right. ईमेल सही नहीं है।");
  }

  const text = [
    "New EIDF signup",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `State: ${state}`,
    `Place: ${place}`,
    `Wants to: ${INTENTS[intent]}`,
    `Email: ${email || "none"}`,
  ].join("\n");

  const recipients = String(env.NOTIFY_EMAIL || "sanjeeveecd@gmail.com,harshitarnav@gmail.com")
    .split(/[,;\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const key = String(env.RESEND_API_KEY || "").trim();
  if (!key || recipients.length === 0) {
    return fail(500, "Mail is not configured.");
  }

  const from = String(env.RESEND_FROM || "EIDF <onboarding@resend.dev>").trim();
  let sent = await sendAll(key, from, recipients, `EIDF signup · ${name} · ${state}`, text);
  if (sent === 0 && from !== "EIDF <onboarding@resend.dev>") {
    sent = await sendAll(
      key,
      "EIDF <onboarding@resend.dev>",
      recipients,
      `EIDF signup · ${name} · ${state}`,
      text
    );
  }
  if (sent === 0) {
    return fail(502, "Could not send just now. Please try again. अभी भेजा नहीं जा सका।");
  }
  return Response.json({ ok: true });
}

async function sendAll(key, from, recipients, subject, text) {
  const results = await Promise.all(
    recipients.map((to) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to: [to], subject, text }),
      }).then((res) => res.ok)
    )
  );
  return results.filter(Boolean).length;
}

function normalizeMobile(raw) {
  let digits = raw.replace(/\D+/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (!/^[6-9]\d{9}$/.test(digits)) return null;
  return `+91${digits}`;
}

function fail(status, message) {
  return Response.json({ error: message }, { status });
}
