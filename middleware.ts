import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
<<<<<<< Updated upstream
  publicRoutes: ["/", "/api/webhook/clerk"],
  ignoredRoutes: ["/api/webhook/clerk", "/api/webhooks/user", "/test"],
=======
  publicRoutes: ["/", "/api/webhook/clerk", "/post"],
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/api/webhooks/user",
    "/test",
    "/post/post/(.*)",
    "/post",
  ],
>>>>>>> Stashed changes
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
