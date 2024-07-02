import { CreatePostForm } from '@/components/posts/create-post-form';
import { fetchAllGroups } from '@/server/queries';

export default async function NewPostPage() {
  const groups = await fetchAllGroups();

  return (
    <div className="w-8/12">
      <CreatePostForm groups={groups} />
    </div>
  );
}
