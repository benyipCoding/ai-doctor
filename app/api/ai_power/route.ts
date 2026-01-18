// app/api/users/route.ts
import { NextResponse } from "next/server";
import apiClient from "@/utils/request";

export async function GET() {
  const res = await apiClient.get("/users/me");

  const data = res.data;
  return NextResponse.json(data);
}
