import { NextResponse } from "next/server";
import apiClient from "@/utils/request";
import { RequestPayload } from "../types";

export async function POST(data: RequestPayload) {
  try {
    const res = await apiClient.post("/analyzeImage", data);
    const responseData = res.data;
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
