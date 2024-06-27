import { db } from '@/server/db';

export const fetchAllGroups = () => {
  return db.group.findMany();
};
