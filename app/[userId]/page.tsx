import Link from 'next/link';

import { getUserByUsername } from '@/server/queries/users';
import { ProfileBanner } from '@/components/user/profile-banner';

type Props = {
  params: { userId: string };
};

export default async function ProfilePage({ params }: Props) {
  const { userId } = params;

  const user = await getUserByUsername(userId);

  if (!user) return;

  return (
    <div className="w-9/12">
      <ProfileBanner user={user} />

      {/* Feed */}
      <div className="py-10">
        <ul className="space-y-12">
          <li className="space-y-4">
            <div className="space-x-2 text-[15px]">
              <span className="font-semibold text-ring">MAY 22 2024</span>
              <Link href={'/'} className="hover:underline">
                replied to a post
              </Link>
            </div>

            <div className="rounded-[3px] bg-border p-4 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              voluptas amet officia earum nesciunt repudiandae nisi magni dicta
              deserunt ipsam!
            </div>
          </li>

          <li className="space-y-4">
            <div className="space-x-2 text-[15px]">
              <span className="font-semibold text-ring">MAY 22 2024</span>
              <Link href={'/'} className="hover:underline">
                replied to a post
              </Link>
            </div>

            <div className="rounded-[3px] bg-border p-4 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, laborum voluptatum! Debitis, vitae vero! Soluta
              inventore ea praesentium culpa sunt reprehenderit corporis debitis
              saepe consequatur. Reprehenderit animi libero aperiam at.
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
