import { jwtVerify } from "jose"; // Import jwtVerify from jose
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { cookies } from "next/headers";

// Get the JWT secret from the environment or set a fallback for development
const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  // Define routes that do not require authentication
  const publicPaths = [
    "/auth/login",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];

  // If the path is public, we don't need to check for a token
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // If no token is found, redirect to login
  if (!token) {
    console.log("NOT TOKEN");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    // Verify the token using jose's jwtVerify
    const secret = new TextEncoder().encode(JWT_SECRET); // Encode the secret
    await jwtVerify(token, secret); // Verify the token with the secret

    return NextResponse.next(); // Token is valid, allow the request to continue
  } catch (error) {
    console.error("Invalid token:", error);
    // If the token is invalid or expired, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    // Apply to all routes except those specified (like public routes and API)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
