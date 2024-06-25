import { db } from '@/server/db';

type UserUniqueConstraint = 'id' | 'email' | 'username';

type UserWhereUniqueInput = Record<UserUniqueConstraint, string>;

const getUserBy = (key: UserUniqueConstraint) => async (value: string) => {
  const user = await db.user.findUnique({
    where: {
      [key]: value,
    } as UserWhereUniqueInput,
  });

  return user;
};

export const getUserById = getUserBy('id');
export const getUserByEmail = getUserBy('email');
export const getUserByUsername = getUserBy('username');
