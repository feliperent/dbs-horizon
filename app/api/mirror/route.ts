import { NextResponse } from "next/server";
import { generateMirrorMessage } from "@/lib/ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const save = typeof body.save === "number" ? body.save : 0;
  return NextResponse.json(generateMirrorMessage(save));
}
