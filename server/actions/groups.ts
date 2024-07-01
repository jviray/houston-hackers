'use server';

import { NewGroupSchema } from '@/lib/schemas';
import { fetchGroupByName } from '@/server/queries';
import { checkUnique, createServerAction, validate } from '@/lib/utils';
import { type NewGroupData } from '@/server/mutations/groups';
import { createGroup } from '@/server/mutations';

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
  createGroup,
)({
  requireAuthentication: true,
  successMessage: 'Group created!',
  errorMessage: 'Failed to create group.',
  pathToRevalidate: '/',
});
