'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { awsS3 } from '@/config/aws';
import { generateImageFilename, getCurrentUser } from '@/lib/utils';

// TODO: Handle validation with Zod
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10MB

export const requestSignedUrl = async (
  type: string,
  size: number,
  checksum: string,
) => {
  const user = await getCurrentUser();
  if (!user) {
    return { error: 'Not authenticated.' };
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(type)) {
    return { error: 'Invalid file type.' };
  }

  if (size > MAX_FILE_SIZE) {
    return { error: 'File is too large.' };
  }

  const putObjCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateImageFilename(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: user.id,
    },
  });

  const signedUrl = await getSignedUrl(awsS3, putObjCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
};
