import { z } from 'zod';

export const NewPostFormSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(6, 'Title must be at least 6 characters.')
    .max(128, 'Title cannot be longer than 128 characters.')
    .refine((val) => val !== '', {
      message: 'Title is required.',
    })
    .transform((title) => {
      return title.toLowerCase().trim();
    }),
  // group: z.string().refine((groupId) => !!groupId, {
  //   message: 'Must select a group',
  // }),
});

export const GroupSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, 'Name must be at least 3 characters.')
    .max(21, 'Name cannot be longer than 21 characters.')
    .refine((val) => val !== '', {
      message: 'Name is required.',
    }),
  // image: z.string().url().optional(),
  description: z
    .string({ required_error: 'Description is required' })
    .min(6, 'Description must be at least 6 characters.')
    .max(280, 'Description cannot be longer than 280 characters.')
    .refine((val) => val !== '', {
      message: 'Description is required.',
    }),
});
