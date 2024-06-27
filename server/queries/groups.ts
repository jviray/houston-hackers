import { db } from '@/server/db';

export const fetchAllGroups = () => {
  return db.group.findMany();
};

const fetchGroupBy = (key: 'id' | 'name') => async (value: string) => {
  const user = await db.group.findUnique({
    where: {
      [key]: value,
    } as Record<'id' | 'name', string>,
  });

  return user;
};

export const fetchGroupById = fetchGroupBy('id');
export const fetchGroupByName = fetchGroupBy('name');
