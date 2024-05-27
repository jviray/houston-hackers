import { type NextRequestWithAuth, withAuth } from 'next-auth/middleware';

// `withAuth` augments a `Request` with user's token, then passes it middleware callback
export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    return null;
  },
  {
    callbacks: {
      // Return true to always execute middleware
      authorized: () => true,
    },
  },
);

// Regex below will cause middleware to be invoked on all routes except some
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
