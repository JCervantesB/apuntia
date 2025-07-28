import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const userApiLimitsCount = await prismadb.userApiLimit.count();
    return NextResponse.json({ count: userApiLimitsCount });
  } catch (error) {
    console.error("[HEALTH_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}