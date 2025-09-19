import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "http://localhost:5000/api/reviews";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; action: string } } // params is an object, not a Promise
) {
  try {
    const res = await fetch(`${BASE_URL}/${params.id}/${params.action}`, {
      method: "POST",
    });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
