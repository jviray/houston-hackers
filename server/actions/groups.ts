'use server';

import { z } from 'zod';
import { User } from '@prisma/client';

import { NewGroupSchema } from '@/lib/schemas';
import { db } from '@/server/db';
import { createServerAction, generateId, validate } from '@/lib/utils';

type NewGroupData = z.infer<typeof NewGroupSchema>;

export const submitNewGroup = createServerAction(
  validate(NewGroupSchema),
  // check unique name
  async (data: NewGroupData, user: User) => {
    const { name, description, image } = data;
    return await db.group.create({
      data: {
        id: generateId(),
        name,
        image,
        description,
        creator: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  },
)({
  requireAuthentication: true,
  successMessage: 'Group created!',
  errorMessage: 'Failed to create group.',
  pathToRevalidate: '/',
});
