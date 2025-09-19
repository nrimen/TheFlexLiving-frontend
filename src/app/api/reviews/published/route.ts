import { NextResponse } from "next/server";

const BASE_URL = "http://localhost:5000/api/reviews";

export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/published`, { cache: "no-store" });
    if (!res.ok) throw new Error("Backend fetch failed");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
