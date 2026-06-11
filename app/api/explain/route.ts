import { NextResponse } from "next/server";
import { explainStep } from "@/lib/ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const title = typeof body.title === "string" ? body.title : "";
  return NextResponse.json({ paraphrase: explainStep(title) });
}
