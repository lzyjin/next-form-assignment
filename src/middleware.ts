import {NextRequest, NextResponse} from "next/server";
import {getSession} from "@/lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicUrls: Routes = {
  // "/": true,
  "/create-account": true,
  "/log-in": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exist = publicUrls[request.nextUrl.pathname];

  // 로그인
  if (session.id) {
    // publicUrls 접근 불가
    if (exist) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 로그아웃
  } else {
    // publicUrls가 아님
    if (!exist) {
      return NextResponse.redirect(new URL("/log-in", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};