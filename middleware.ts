import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protected routes (allow leaderboard access without login)
  if (!user && request.nextUrl.pathname.startsWith("/dashboard") && !request.nextUrl.pathname.startsWith("/dashboard/leaderboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Protected settings page (requires login)
  if (!user && request.nextUrl.pathname.startsWith("/settings")) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users from landing to dashboard
  if (user && request.nextUrl.pathname === "/") {
    // Check if onboarding is done
    // Note: We avoid DB calls in middleware for performance, but for this MVP it's acceptable logic
    // Ideally we'd store onboarding status in metadata or cookie
    // For now we just redirect to onboarding check logic on client or server page
    
    // Simplified: Redirect to dashboard, let dashboard redirect to onboarding if needed
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
