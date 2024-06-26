'use server';

import { FormFields as NewGroup } from '@/components/groups/create-group-form';
import { createServerAction, generateId, getCurrentUser } from '@/lib/utils';
import { db } from '@/server/db';

const verifyUser = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: 'Not authenticated.' };
  }
};

export const submitNewGroup = async (data: NewGroup) => {};

// Verify logged in
// Validate data
// Check unique store name
// Upload file

// async (data) => {
//   const { name, image, description, id} = data;
//   await db.group.create({
//     data: {
//       id: generateId(),
//       name,
//       image,
//       description,
//       creator: {
//         connect: {
//           id,
//         }
//       }
//     }
//   })
// }
