'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { getCurrentUser } from '@/server/queries/users';
import { generateImageFilename } from '@/lib/utils';

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

// TODO: Handle validation with Zod
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10MB

export async function getImageSignedUrl(
  type: string,
  size: number,
  checksum: string,
) {
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

  const signedUrl = await getSignedUrl(s3, putObjCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
}
