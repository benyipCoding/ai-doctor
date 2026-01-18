import { NextResponse } from "next/server";
import apiClient from "@/utils/request";
import { AnalyzePayload } from "../types";

export async function POST(request: Request) {
  try {
    const data: AnalyzePayload = await request.json();
    const res = await apiClient.post("/analyzeImage", data, {
      headers: {
        "Content-Type": request.headers.get("Content-Type"),
      },
    });
    const responseData = res.data;
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
