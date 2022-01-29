import { AuthCheck } from "components";

export default function AdminPostPage({}) {
  return (
    <main>
      <AuthCheck>
        <h3>Welcome to Admin Page</h3>
      </AuthCheck>
    </main>
  );
}
