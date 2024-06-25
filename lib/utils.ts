import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { nanoid } from 'nanoid';
import cryptoLib from 'crypto';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession } from 'next-auth';

import { fetchUserByUsername } from '@/server/queries';
import { options as authOptions } from '@/config/auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = () => {
  return nanoid(16);
};

export const generateUsernameFromEmail = async (email: string) => {
  let username = email.split('@')[0].toLowerCase().trim();
  const existingUser = await fetchUserByUsername(username);

  if (existingUser) {
    const randomNum = cryptoLib.randomInt(100, 999).toString();
    username = `${username}${randomNum}`;
  }

  return username;
};

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const generateSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};

export const generateImageFilename = (bytes = 32) =>
  cryptoLib.randomBytes(bytes).toString('hex');

// Helper function for use in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
