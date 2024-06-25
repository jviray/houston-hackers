import { db } from '@/server/db';

type UserUniqueConstraint = 'id' | 'email' | 'username';

type UserWhereUniqueInput = Record<UserUniqueConstraint, string>;

const fetchUserBy = (key: UserUniqueConstraint) => async (value: string) => {
  const user = await db.user.findUnique({
    where: {
      [key]: value,
    } as UserWhereUniqueInput,
  });

  return user;
};

export const fetchUserById = fetchUserBy('id');
export const fetchUserByEmail = fetchUserBy('email');
export const fetchUserByUsername = fetchUserBy('username');
