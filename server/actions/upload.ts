'use server';

import { getCurrentUser } from '@/server/queries/users';

export async function getSignedUrl() {
  const user = await getCurrentUser();
  if (!user) {
    return { error: 'Not authenticated.' };
  }

  return { success: { url: '' } };
}
