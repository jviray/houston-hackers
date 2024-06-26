'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { awsS3 } from '@/config/aws';
import {
  createServerAction,
  generateImageFilename,
  generateSHA256,
  getCurrentUser,
  validate,
} from '@/lib/utils';
import { User } from '@prisma/client';
import { ImageFileSchema } from '@/lib/schemas';

const requestSignedUrl = async (
  userId: string,
  type: string,
  size: number,
  checksum: string,
) => {
  const putObjCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateImageFilename(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId,
    },
  });

  const signedUrl = await getSignedUrl(awsS3, putObjCommand, {
    expiresIn: 60,
  });

  return signedUrl;
};

const uploadMedia = async (file: File, user: User) => {
  const checksum = await generateSHA256(file);
  const signedUrl = await requestSignedUrl(
    user.id,
    file.type,
    file.size,
    checksum,
  );

  const res = await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!res.ok) {
    throw new Error('Could not upload to s3 url.');
  }

  return signedUrl.split('?')[0];
};

export const uploadImage = createServerAction(
  validate(ImageFileSchema),
  async (formFile: FormData, user: User) => {
    const file = formFile.get('imageFile') as File;
    return await uploadMedia(file, user);
  },
)({
  requireAuthentication: true,
});
