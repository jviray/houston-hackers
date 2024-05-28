import type { DefaultSession } from 'next-auth';
import type { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    username: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      username: string;
    };
  }
}
