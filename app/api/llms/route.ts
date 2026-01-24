import { NextResponse } from "next/server";
import apiClient from "@/utils/request";

export async function GET(request: Request) {
  try {
    const res = await apiClient.get("/llms");
    const responseData = res.data;
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch LLMs" },
      { status: 500 }
    );
  }
}
