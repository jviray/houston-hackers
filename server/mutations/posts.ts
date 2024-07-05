import { User } from '@prisma/client';

import { FormFields as CreatePostFormData } from '@/components/posts/create-post-form';
import { db } from '@/server/db';
import { generateId } from '@/lib/utils';

export const createPost = async (data: CreatePostFormData, user: User) => {
  const { title, group, content } = data;
  return await db.post.create({
    data: {
      id: generateId(),
      author: {
        connect: {
          id: user.id,
        },
      },
      title,
      group: {
        connect: {
          id: group,
        },
      },
      content: JSON.parse(content),
    },
  });
};
