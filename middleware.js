import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          // Set cookie in the request
          request.cookies.set({ name, value, ...options });
          // Update response with the new cookie
          response.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          // Delete cookie in the request
          request.cookies.set({ name, value: "", ...options });
          // Update response to remove the cookie
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Get user session
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect logic
  if (user && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/photos", request.url));
  }

  if (!user && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/photos"],
};