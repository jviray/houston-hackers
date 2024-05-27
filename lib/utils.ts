import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { nanoid } from 'nanoid';
import crypto from 'crypto';
import { getUserByUsername } from '@/server/queries/users';

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
