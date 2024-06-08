import { z } from 'zod';

export const NewPostFormSchema = z.object({
  title: z
    .string()
    .min(6, 'Title must be at least 6 characters.')
    .max(128, 'Title cannot be longer than 128 characters.')
    .transform((title) => {
      return title.toLowerCase().trim();
    }),
  group: z.string().refine((groupId) => !!groupId, {
    message: 'Must select a group',
  }),
  content: z.string().refine((content) => JSON.parse(content)),
});
