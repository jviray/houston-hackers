import { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';

import { db } from '@/server/db';
import { createUser } from '@/server/mutations';
import { fetchUserById } from '@/server/queries';

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await fetchUserById(token.sub);
      if (!user) return token;

      token.username = user.username;

      return token;
    },
    // Persist relevant user data on the client via session
    async session({ token, session }) {
      // Add id and username to session
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.username = token.username;
      }

      return session;
    },
  },
  adapter: {
    ...PrismaAdapter(db),
    createUser,
  } as Adapter,
} satisfies NextAuthOptions;
