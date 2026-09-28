import { NextResponse } from "next/server";

const services = new Set(["Bathroom Remodeling", "Tile & Flooring", "Plumbing", "Electrical", "Painting & Repairs", "Carpentry & Doors", "Decks", "Covered Porches", "Countertops & Cabinets", "Other"]);
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 12000) return NextResponse.json({ error: "Request too large" }, { status: 413 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
  if (body.website) return NextResponse.json({ ok: true });
  const firstName = clean(body.firstName, 80), lastName = clean(body.lastName, 80);
  const email = clean(body.email, 254), phone = clean(body.phone, 30);
  const city = clean(body.city, 100), zip = clean(body.zip, 10);
  const projectType = clean(body.projectType, 60), details = clean(body.details, 3000);
  if (!firstName || !lastName || !city || !/^[0-9]{5}(-[0-9]{4})?$/.test(zip) || !services.has(projectType) || details.length < 10 || (!email && !phone) || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return NextResponse.json({ error: "Please check the form fields" }, { status: 400 });
  }
  const apiKey = process.env.RESEND_API_KEY, to = process.env.ESTIMATE_TO_EMAIL || "rabeee@shamshomeimprovement.com", from = process.env.ESTIMATE_FROM_EMAIL;
  if (!apiKey || !to || !from) return NextResponse.json({ error: "Email delivery is unavailable" }, { status: 503 });
  const text = [`New estimate request from ${firstName} ${lastName}`, `Location: ${city}, ${zip}`, `Service: ${projectType}`, `Email: ${email || "Not provided"}`, `Phone: ${phone || "Not provided"}`, "", "Project details:", details].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [to], subject: `Estimate request: ${projectType} in ${zip}`, text, ...(email ? { reply_to: email } : {}) }) });
    if (!response.ok) return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Email delivery failed" }, { status: 502 }); }
}
