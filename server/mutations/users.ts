import { User } from '@prisma/client';

import { db } from '@/server/db';
import { generateId, generateUsernameFromEmail } from '@/lib/utils';

type NewOAuthUser = Pick<User, 'name' | 'email' | 'emailVerified' | 'image'>;

export const createUser = async (user: NewOAuthUser) => {
  const { name, email, emailVerified, image } = user;

  const newUser = await db.user.create({
    data: {
      id: generateId(),
      email: email,
      emailVerified: emailVerified,
      name: name,
      image: image,
      username: await generateUsernameFromEmail(email),
    },
  });

  return newUser;
};
