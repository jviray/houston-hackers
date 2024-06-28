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
import { revalidatePath } from 'next/cache';

import { fetchUserByUsername } from '@/server/queries';
import { options as authOptions } from '@/config/auth';
import { Schema } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const generateId = () => {
  return nanoid(16);
};

export function capitalize(input: string) {
  // Removes extra space in the middle, trims leading and trailing spaces and converts to array
  const words = input.replace(/\s+/g, ' ').trim().split(' ');

  // Capitalizes each word and converts back to string
  return words
    .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
    .join(' ');
}

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

/**
 * TODO:
 * - redirect option
 */

export const validate =
  <T>(schema: Schema) =>
  (data: T): { error: string } | undefined => {
    const validation = schema.safeParse(
      data instanceof FormData ? Object.fromEntries(data) : data,
    );

    if (!validation.success) return { error: 'Invalid data.' };
  };

export const checkUnique =
  <T>(
    checkFn: (data: T, ...args: any[]) => Promise<unknown>,
    options?: { message: string },
  ) =>
  async (data: T, ...args: any[]): Promise<{ error: string } | undefined> => {
    try {
      const record = await checkFn(data, ...args);
      const message = options?.message ?? 'Record already exists.';

      if (record) return { error: message };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }

      return { error: 'Something went wrong.' };
    }
  };

type Result = {
  success?: string;
  error?: string;
  payload?: {
    data: any;
  };
};

export const createServerAction =
  <T>(...fns: ((data: T, ...args: any[]) => unknown)[]) =>
  (options?: {
    requireAuthentication?: boolean;
    pathToRevalidate?: string;
    successMessage?: string;
    errorMessage?: string;
  }) =>
  async (data: T, ...args: any[]): Promise<Result> => {
    const serverAction = fns[fns.length - 1];
    const preFns = fns.slice(0, -1);

    let serverActionResult;
    try {
      let user;
      if (options?.requireAuthentication) {
        user = await getCurrentUser();
        if (!user) return { error: 'Not authenticated.' };
      }

      // Call pre-functions (middlewares)
      for (const fn of preFns) {
        // Note: Only known errors would get returned
        const error = await fn(data, ...args);
        if (error) return error;
      }

      // Call serverAction
      if (user) {
        serverActionResult = await serverAction(data, user, ...args);
      } else {
        serverActionResult = await serverAction(data, ...args);
      }

      // Revalidate
      if (options?.pathToRevalidate) {
        revalidatePath(options.pathToRevalidate);
      }
    } catch (error: unknown) {
      // Anything is assignable to unknown, but unknown isn't assignable to anything but itself
      if (error instanceof Error) {
        return { error: error.message };
      }

      const errorMessage = options?.errorMessage ?? 'Something went wrong.';
      return { error: errorMessage };
    }

    const successMessage = options?.successMessage ?? 'Success.';
    return {
      success: successMessage,
      ...(serverActionResult
        ? {
            payload: {
              data: serverActionResult,
            },
          }
        : {}),
    };
  };
