import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { nanoid } from 'nanoid';
import crypto from 'crypto';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession } from 'next-auth';

import { getUserByUsername } from '@/server/queries/users';
import { options as authOptions } from '@/config/auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = () => {
  return nanoid(16);
};

export const generateUsernameFromEmail = async (email: string) => {
  let username = email.split('@')[0].toLowerCase().trim();
  const existingUser = await getUserByUsername(username);

  if (existingUser) {
    const randomNum = crypto.randomInt(100, 999).toString();
    username = `${username}${randomNum}`;
  }

  return username;
};

// Helper function for use in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
