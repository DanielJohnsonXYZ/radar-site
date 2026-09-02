import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  model?: string;
  relationships?: string;
  catchFirst?: string;
  website?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (String(body.website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const model = String(body.model ?? "").trim();
  const relationships = String(body.relationships ?? "").trim();

  if (!name || !email || !model || !relationships) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  console.info("[radar-pilot]", {
    name,
    email,
    model,
    relationships,
    catchFirst: String(body.catchFirst ?? "").trim() || null,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
