import { NextResponse } from "next/server";

const BASE_URL = "http://localhost:5000/api/reviews";

export async function POST(
  req: Request,
  { params }: { params: { id: string; action: string } }
) {
  try {
    const res = await fetch(`${BASE_URL}/${params.id}/${params.action}`, { method: "POST" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
