'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { getCurrentUser } from '@/server/queries/users';

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export async function getImageSignedUrl() {
  const user = await getCurrentUser();
  if (!user) {
    return { error: 'Not authenticated.' };
  }

  const putObjCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: 'test-file',
  });

  const signedUrl = await getSignedUrl(s3, putObjCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
}
