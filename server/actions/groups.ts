'use server';

import { z } from 'zod';
import { User } from '@prisma/client';

import { NewGroupSchema } from '@/lib/schemas';
import { db } from '@/server/db';
import {
  checkUnique,
  createServerAction,
  generateId,
  validate,
} from '@/lib/utils';
import { fetchGroupByName } from '../queries/groups';

type NewGroupData = z.infer<typeof NewGroupSchema>;

const checkUniqueGroupName = checkUnique<NewGroupData>(
  async ({ name }) => {
    return await fetchGroupByName(name);
  },
  {
    message: 'Name is already taken',
  },
);

export const submitNewGroup = createServerAction(
  validate(NewGroupSchema),
  checkUniqueGroupName,
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
