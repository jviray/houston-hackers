import { z } from 'zod';

export const NewPostFormSchema = z.object({
  title: z
    .string({ required_error: 'Title is required.' })
    .min(6, 'Title must be at least 6 characters.')
    .max(128, 'Title cannot be longer than 128 characters.')
    .refine((title) => title !== '', {
      message: 'Title is required.',
    })
    .transform((title) => {
      return title.toLowerCase().trim();
    }),
  // group: z.string().refine((groupId) => !!groupId, {
  //   message: 'Must select a group',
  // }),
});

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_AVATAR_SIZE = 1024 * 1024; // 1MB

export const ImageFileSchema = z.object({
  imageFile: z
    .instanceof(File)
    // Becasue file is optional, only execute refine() if file exists
    .refine((file) => {
      return !file || file.size <= MAX_AVATAR_SIZE;
    }, 'File is too large.')
    .refine((file) => {
      // Account for `empty` default file (empty file name and size)
      return (
        !file ||
        !file.name ||
        !file.size ||
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, 'Invalid file type.'),
});

export const CreateGroupFormSchema = z.object({
  name: z
    .string({ required_error: 'Name is required.' })
    .min(3, 'Name must be at least 3 characters.')
    .max(40, 'Name cannot be longer than 40 characters.')
    .regex(/^[\s]?[^\s]*([\s]?[^\s]+)*[\s]?$/, 'Invalid format.')
    .refine((name) => name !== '', {
      message: 'Name is required.',
    })
    .transform((name) => {
      return name.toLowerCase().trim();
    }),
  imageFile: z
    .instanceof(File)
    .optional()
    // Becasue file is optional, only execute refine() if file exists
    .refine((file) => {
      return !file || file.size <= MAX_AVATAR_SIZE;
    }, 'File is too large.')
    .refine((file) => {
      // Account for `empty` default file (empty file name and size)
      return (
        !file ||
        !file.name ||
        !file.size ||
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, 'Invalid file type.'),
  description: z
    .string({ required_error: 'Description is required' })
    .min(6, 'Description must be at least 6 characters.')
    .max(280, 'Description cannot be longer than 280 characters.')
    .refine((description) => description !== '', {
      message: 'Description is required.',
    })
    .transform((description) => {
      return description.trim();
    }),
});

export const NewGroupSchema = z.object({
  name: z
    .string({ required_error: 'Name is required.' })
    .min(3, 'Name must be at least 3 characters.')
    .max(40, 'Name cannot be longer than 40 characters.')
    .regex(/^[\s]?[^\s]*([\s]?[^\s]+)*[\s]?$/, 'Invalid format.')
    .refine((name) => name !== '', {
      message: 'Name is required.',
    })
    .transform((name) => {
      return name.toLowerCase().trim();
    }),
  image: z.string().optional(),
  description: z
    .string({ required_error: 'Description is required' })
    .min(6, 'Description must be at least 6 characters.')
    .max(280, 'Description cannot be longer than 280 characters.')
    .refine((description) => description !== '', {
      message: 'Description is required.',
    })
    .transform((description) => {
      return description.trim();
    }),
});
