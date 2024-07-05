'use server';

import { CreatePostFormSchema as NewPostSchema } from '@/lib/schemas';
import { createServerAction, validate } from '@/lib/utils';
import { createPost } from '@/server/mutations';

export const submitNewPost = createServerAction(
  validate(NewPostSchema),
  createPost,
)({
  requireAuthentication: true,
  successMessage: 'Post created!',
  errorMessage: 'Failed to create post.',
  pathToRevalidate: '/',
});
