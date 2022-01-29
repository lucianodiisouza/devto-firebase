import { useCollection } from "react-firebase-hooks/firestore";

import { firestore, auth } from "lib/firebase";
import { PostFeed } from "components";

const PostList = () => {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");

  const query = ref.orderBy("createdAt");

  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your posts</h1>
      <PostFeed posts={posts} />
    </>
  );
};

export default PostList;
