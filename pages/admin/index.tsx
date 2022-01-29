import { AuthCheck, PostList, CreateNewPost } from "components";

export default function AdminPostPage() {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}
