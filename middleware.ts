import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 中间件：路由守卫（占位实现）
// 目标：保护 /api/ai_power 接口。如果未鉴权，则重定向到 /auth

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 仅对指定路径生效
  if (pathname.startsWith("/api/ai_power")) {
    // 占位鉴权逻辑：检查名为 `token` 的 cookie 是否存在。
    // TODO: 在后续实现中替换为真实鉴权逻辑（如 JWT 验证、Session 校验等）。
    const token = req.cookies.get("token")?.value;
    // const isAuthenticated = Boolean(token);
    const isAuthenticated = true;
    // const isAuthenticated = false; // 临时强制未鉴权，便于测试重定向逻辑

    if (!isAuthenticated) {
      //   const url = req.nextUrl.clone();
      //   url.pathname = "/auth";
      //   // 可选：保留原始请求路径便于登录后跳回
      //   url.searchParams.set("redirect", pathname);
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/ai_power"],
};
