'use server';

import { z } from 'zod';
import { User } from '@prisma/client';

import { db } from '@/server/db';
import { generateId } from '@/lib/utils';
import { NewGroupSchema } from '@/lib/schemas';

export type NewGroupData = z.infer<typeof NewGroupSchema>;

export const createGroup = async (data: NewGroupData, user: User) => {
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
};
