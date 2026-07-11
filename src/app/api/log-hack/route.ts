import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ error: "Missing secret key" }, { status: 400 });
    }

    const apiUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API;
    if (!apiUrl) {
      return NextResponse.json({ error: "No API URL configured" }, { status: 500 });
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, action: "dev_mode_detected" }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending hack log to Google Sheets:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
